import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetTransactionsInput = Pick<Prisma.FindManyTransactionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getTransactions(
  { where, orderBy, skip = 0, take }: GetTransactionsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  if (ctx.session.userId !== where?.userId) {
    ctx.session.authorize(['*', 'bde'])
  }

  const transactions = await db.transaction.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.transaction.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    transactions,
    nextPage,
    hasMore,
    count,
  }
}
