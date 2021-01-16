import { Ctx } from "blitz"

import db, { Prisma } from "db"

type DeleteTransactionInput = Pick<Prisma.TransactionDeleteArgs, "where">

export default async function deleteTransaction({ where }: DeleteTransactionInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const transaction = await db.transaction.findUnique({
    where,
    include: { user: { include: { userStats: true } } },
  })

  if (!transaction) {
    throw new Error("Transaction introuvable")
  }

  if (!transaction.articleId) {
    throw new Error("Transaction non annulable")
  }

  let userStats
  const amount = Math.abs(transaction.amount)

  if (transaction.user.userStats?.articlesStats) {
    transaction.user.userStats.articlesStats[transaction.articleId] -= 1

    //Decrement article stats
    userStats = await db.userStats.update({
      data: { articlesStats: transaction.user.userStats.articlesStats },
      where: { id: transaction.user.userStats?.id },
    })
  }

  const [user, oldTransaction] = await Promise.all([
    // Refund user
    db.user.update({
      data: { balance: { [transaction.type === "CREDIT" ? "decrement" : "increment"]: amount } },
      where: { id: transaction.userId },
    }),
    //Delete transaction
    db.transaction.delete({ where }),
  ])

  return {
    user,
    userStats,
    oldTransaction,
  }
}
