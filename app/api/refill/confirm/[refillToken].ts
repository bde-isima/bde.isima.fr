import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import db from 'db'
import middleware from '../../middleware/middleware'
import {
  parseRefillToken,
  makeHmac,
  makeMerchantReference,
  makeShopOrderReference,
} from '../helper'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query } = req

  const token = query.refillToken as string

  const token_info = parseRefillToken(token, `${process.env.SESSION_SECRET_KEY}`)

  if (token_info == null) {
    console.error('Jeuton de validation mal formé')
    res.status(404).json({ name: 'Ill-formed validation token' })
    return
  }

  // Récupération des données

  const {
    posUuid,
    shopReference,
    shopOrderReference,
    amount,
    discount,
    currency,
    status,
    creationDate,
    transactionUuid,
    additionalData,
    mac,
  } = body

  // Vérification de l’autenticité des données

  if (
    makeHmac(
      [
        posUuid,
        shopReference,
        shopOrderReference,
        amount,
        discount,
        currency,
        status,
        creationDate,
        transactionUuid,
        additionalData,
      ],
      `${process.env.LYF_API_SECRET_KEY}`
    ) != mac
  ) {
    console.error('Le HMAC fourni est invalide')
    res.status(400).json({ name: 'Invalid HMAC token' })
    return
  }

  // Vérification de la cohérence des données

  if (
    posUuid != `${process.env.LYF_API_VENDOR_ID}` ||
    shopReference != makeMerchantReference(token_info.card, token_info.creation_date) ||
    shopOrderReference != makeShopOrderReference(token_info.card, token_info.amount) ||
    amount != token_info.amount ||
    currency != 'EUR' ||
    ['VALIDATED', 'REFUSED'].indexOf(status) > -1
  ) {
    console.error('Certaines données de la requête sont incohérentes par rapport au jeuton')
    res.status(400).json({ name: 'Inconsistent data' })
    return
  }

  // Vérification de la présence de la requête dans l’historique

  if (await db.refill.findUnique({ where: { reference: shopReference } })) {
    console.error(`La transaction référencée ${shopReference} a déjà été effectuée`)
    res.status(400).json({ name: 'Already computed' })
  }

  // Vérification du status de la requête

  if (status == 'VALIDATED') {
    // Ajout de l’argent à l’utilisateur
    db.user.update({
      where: { id: token_info.user_id },
      data: { balance: { increment: amount } },
    })
  }

  // Ajout de la reqête à l’historique

  db.refill.create({
    data: {
      reference: shopReference,
      order_reference: shopOrderReference,
      amount,
      method: token_info.by_credit_card ? 'CREDIT_CARD' : 'LYF',
      is_validated: status == 'VALIDATED',
      timestamp: creationDate,
    },
  })

  res.status(200).send('OK')

  /*const {
    amount,
    currency,
    order_ref,
    request_id,
    signed,
    transaction_identifier,
    vendor_token,
    sig,
  } = body

  const signature = md5(
    `amount=${amount}&currency=${currency}&order_ref=${order_ref}&request_id=${request_id}&signed=${signed}&transaction_identifier=${transaction_identifier}&vendor_token=${vendor_token}&${process.env.LYDIA_API_VENDOR_ID}`
  )
  const token = query.refillToken as string
  const tAmount = parseFloat(amount)

  if (sig !== signature) {
    console.error('Rechargement non autorisé')
    res.status(401).json({ name: 'Rechargement non autorisé' })
  } else if (Number.isNaN(tAmount) || tAmount <= 0) {
    console.error('Montant incorrect')
    res.status(403).json({ name: 'Montant incorrect' })
  } else {

    const user = await db.user.findUnique({ where: { id } })

    if (user) {
      await Promise.all([
        db.user.update({
          where: { id },
          data: { balance: { increment: tAmount } },
        }),
        db.transaction.create({
          data: {
            amount: tAmount,
            description: `Rechargement +${tAmount} €`,
            type: 'CREDIT',
            user: { connect: { id } },
            prevBalance: user.balance,
          },
        }),
      ])

      console.log('Rechargement effectué')
      res.status(200).json({ name: 'Rechargement effectué' })
    } else {
      console.error('Utilisateur introuvable')
      res.status(404).json({ name: 'Utilisateur introuvable' })
    }
  }*/
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
