import db from 'db';
import { NextApiRequest, NextApiResponse } from 'next';

import { makeHmac, makeMerchantReference, makeShopOrderReference, parseTopUpToken } from 'app/core/utils/topup';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { body, query } = req;

    const token = query.token as string;

    const tokenInfo = parseTopUpToken(token, `${process.env.SESSION_SECRET_KEY}`);

    if (tokenInfo == null) {
      res.status(404).send('BAD TOKEN');
      return;
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
      mac
    } = body;

    // Verification of data authenticity

    const testMAC = makeHmac(
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
        additionalData
      ],
      `${process.env.LYF_API_SECRET_KEY}`
    ).toUpperCase();

    if (testMAC != mac) {
      res.status(400).send('BAD MAC');
      return;
    }

    // Verification of data consistency

    if (
      posUuid != `${process.env.LYF_API_VENDOR_ID}` ||
      shopReference != makeMerchantReference(tokenInfo.card, tokenInfo.creationDate) ||
      shopOrderReference != makeShopOrderReference(tokenInfo.card, tokenInfo.amount) ||
      amount != tokenInfo.amount ||
      currency != 'EUR' ||
      ['VALIDATED', 'REFUSED'].indexOf(status) <= -1
    ) {
      res.status(400).send('INCONSISTENT DATA');
      return;
    }

    // Checking the status of the request

    if (status == 'VALIDATED') {
      // Adding money to the user

      const user = await db.user.findUnique({ where: { id: tokenInfo.userId } });

      if (user != null) {
        const qAmount = amount / 100;

        await Promise.all([
          db.transaction.create({
            data: {
              amount: qAmount,
              description: `Rechargement +${qAmount}€`,
              type: 'CREDIT',
              user: { connect: { id: tokenInfo.userId } },
              prevBalance: user.balance
            }
          }),
          db.user.update({
            where: { id: tokenInfo.userId },
            data: { balance: { increment: qAmount } }
          })
        ]);
        res.status(200).send('OK');
      } else {
        res.status(500).send('UNKNOWN USER');
      }
    } else {
      res.status(200).send('OK');
    }
  } else {
    res.status(400).send('BAD REQUEST');
  }
}
