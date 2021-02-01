import cuid from "cuid"
import { Ctx } from "blitz"

import db, { JsonObject, Prisma } from "db"

type CreateTransactionInput = {
  data: Omit<Prisma.TransactionUncheckedCreateInput, "type" | "amount" | "prevBalance">
}

export default async function createArticleTransaction({ data }: CreateTransactionInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const { userId, articleId, description } = data

  const receiverUser = await db.user.findUnique({
    where: { id: userId },
    include: { userStats: true },
  })

  if (!receiverUser) {
    throw new Error("Utilisateur introuvable")
  }

  const article = await db.article.findUnique({ where: { id: articleId! } })

  if (!article) {
    throw new Error("Article introuvable")
  }

  const amount = receiverUser.is_member ? article.member_price : article.price

  // Update the number of articles bought stats
  const newStat =
    receiverUser.userStats?.articlesStats && receiverUser.userStats?.articlesStats[article.id]
      ? receiverUser.userStats?.articlesStats[article.id] + 1
      : 1
  const upsertData = {
    articlesStats: {
      ...((receiverUser.userStats?.articlesStats as JsonObject) ?? {}),
      [article.id]: newStat,
    },
  }

  const transactionAndUser = await Promise.all([
    // Create DEBIT transaction for the user
    db.transaction.create({
      data: {
        amount,
        description,
        type: "DEBIT",
        userId: receiverUser.id,
        articleId,
        prevBalance: receiverUser.balance,
      },
    }),

    // Update balance of the user
    db.user.update({
      data: { balance: { decrement: amount } },
      where: { id: receiverUser.id },
    }),

    // Update userStats of the user
    db.userStats.upsert({
      create: {
        ...upsertData,
        user: { connect: { id: receiverUser.id } },
      },
      update: upsertData,
      where: { id: receiverUser.userStats?.id ?? cuid() },
    }),
  ])

  return transactionAndUser
}
