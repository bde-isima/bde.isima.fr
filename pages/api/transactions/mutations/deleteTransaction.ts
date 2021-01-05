import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type DeleteTransactionInput = Pick<Prisma.TransactionDeleteArgs, "where">

export default async function deleteTransaction(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where }: DeleteTransactionInput = req.body

  const transaction = await db.transaction.delete({ where })

  res.status(200).json(transaction)
}
