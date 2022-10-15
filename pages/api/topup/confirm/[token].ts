import { NextApiRequest, NextApiResponse } from 'next'

import db from 'db'
import { makeHmac, makeMerchantReference, makeShopOrderReference, parseTopUpToken } from 'app/core/utils/topup'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body, query } = req

    const token = query.token as string

    const token_info = parseTopUpToken(token, `${process.env.SESSION_SECRET_KEY}`)

    if (token_info == null) {
      console.error('Jeton de validation mal formé')
      res.status(404).send('BAD TOKEN')
      return
    }

    // Data retrieval

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

    // Verification of data authenticity

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

    // Verification of data consistency

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

    // Checking the status of the request

    if (status == 'VALIDATED') {
      // Adding money to the user
      const user = await db.user.findUnique({ where: { id: token_info.user_id } })

      if (user != null) {
        const qAmount = amount / 100

        await Promise.all([
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
        res.status(200).send('OK')
      } else {
        res.status(500).send('UNKNOWN USER')
      }
    } else {
      res.status(200).send('OK')
    }
  } else {
    res.status(400).send('BAD REQUEST')
  }
}
