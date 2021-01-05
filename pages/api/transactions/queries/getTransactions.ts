import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetTransactionsInput = Pick<
  Prisma.FindManyTransactionArgs,
  "where" | "orderBy" | "skip" | "take"
>

export default async function getTransactions(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { where, orderBy, skip = 0, take }: GetTransactionsInput = req.body

  /*if (session.userId !== where?.userId) {
    session.authorize(['*', 'bde'])
  }*/

  const transactions = await db.transaction.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.transaction.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  res.status(200).json({
    transactions,
    nextPage,
    hasMore,
    count,
  })
}
