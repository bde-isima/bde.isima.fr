import cuid from "cuid"
import { Ctx } from "blitz"

import db, { JsonObject, Prisma } from "db"

type CreateTransactionInput = {
  data: Omit<Prisma.TransactionCreateInput, "type" | "amount" | "prevBalance">
}

export default async function createArticleTransaction({ data }: CreateTransactionInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const user = await db.user.findUnique({
    where: { id: data.user.connect?.id },
    include: { userStats: true },
  })

  if (!user) {
    throw new Error("Utilisateur introuvable")
  }

  const article = await db.article.findUnique({ where: { id: data.article?.connect?.id } })

  if (!article) {
    throw new Error("Article introuvable")
  }

  const amount = user?.is_member ? article?.member_price : article?.price

  const newStat =
    user.userStats?.articlesStats && user.userStats?.articlesStats[article.id]
      ? user.userStats?.articlesStats[article.id] + 1
      : 1
  const upsertData = {
    articlesStats: {
      ...((user.userStats?.articlesStats as JsonObject) ?? {}),
      [article.id]: newStat,
    },
  }

  const transactionAndUser = await Promise.all([
    // Create DEBIT transaction for the user
    db.transaction.create({
      data: {
        ...data,
        type: "DEBIT",
        amount,
        prevBalance: user.balance,
      },
    }),

    // Update balance of the user
    db.user.update({
      data: { balance: { decrement: amount } },
      where: { id: data?.user?.connect?.id },
    }),

    // Update userStats of the user
    db.userStats.upsert({
      create: {
        ...upsertData,
        user: { connect: { id: user.id } },
      },
      update: upsertData,
      where: { id: user.userStats?.id ?? cuid() },
    }),
  ])

  return transactionAndUser
}
