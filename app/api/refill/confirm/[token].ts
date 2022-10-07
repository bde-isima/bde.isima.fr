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

  const token = query.token as string

  console.log(`Réception du jeton: ${token}`)

  const token_info = parseRefillToken(token, `${process.env.SESSION_SECRET_KEY}`)

  if (token_info == null) {
    console.error('Jeton de validation mal formé')
    res.status(404).send('BAD TOKEN')
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

  let test_mac = makeHmac(
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
  ).toUpperCase()

  if (test_mac != mac) {
    console.error(`Le HMAC fourni est invalide. Attendu ${mac}, reçu ${test_mac}`)
    res.status(400).send('BAD MAC')
    return
  }

  // Vérification de la cohérence des données

  if (
    posUuid != `${process.env.LYF_API_VENDOR_ID}` ||
    shopReference != makeMerchantReference(token_info.card, token_info.creation_date) ||
    shopOrderReference != makeShopOrderReference(token_info.card, token_info.amount) ||
    amount != token_info.amount ||
    currency != 'EUR' ||
    ['VALIDATED', 'REFUSED'].indexOf(status) <= -1
  ) {
    console.error('Certaines données de la requête sont incohérentes par rapport au jeton')
    console.info(`Données du jeton: ${JSON.stringify(token_info, null, 2)}`)
    console.info(`Données de la requête: ${JSON.stringify(body, null, 2)}`)
    console.info(`Identifiant du vendeur: ${process.env.LYF_API_VENDOR_ID}`)
    res.status(400).send('INCONSISTENT DATA')
    return
  }

  // Vérification de la présence de la requête dans l’historique

  if (await db.refill.findUnique({ where: { reference: shopReference } })) {
    console.error(`La transaction référencée ${shopReference} a déjà été effectuée`)
    res.status(400).send('ALREADY COMPUTED')
  }

  // Ajout de la reqête à l’historique

  let create_history_future = db.refill.create({
    data: {
      reference: shopReference,
      order_reference: shopOrderReference,
      amount,
      method: token_info.by_credit_card ? 'CREDIT_CARD' : 'LYF',
      is_validated: status == 'VALIDATED',
      timestamp: creationDate,
    },
  })

  // Vérification du status de la requête

  if (status == 'VALIDATED') {
    // Ajout de l’argent à l’utilisateur
    const user = await db.user.findUnique({ where: { id: token_info.user_id } })

    if (user != null) {
      const qAmount = amount / 100

      await Promise.all([
        create_history_future,
        db.transaction.create({
          data: {
            amount: qAmount,
            description: `Rechargement +${qAmount}€`,
            type: 'CREDIT',
            user: { connect: { id: token_info.user_id } },
            prevBalance: user.balance,
          },
        }),
        db.user.update({
          where: { id: token_info.user_id },
          data: { balance: { increment: qAmount } },
        }),
      ])
    } else {
      console.error('La transaction a été refusée par lyf')

      await create_history_future
    }

    res.status(200).send('OK')
  } else {
    res.status(500).send('UNKNOWN USER')
  }
})

export const config = {
  api: {
    bodyParser: true,
  },
}

export default handler