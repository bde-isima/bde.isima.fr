import { Ctx } from "blitz"

import db, { Prisma } from "db"

type CreateTransactionInput = { data: Omit<Prisma.TransactionCreateInput, "type" | "amount" | "prevBalance"> }

export default async function createArticleTransaction(
  { data }: CreateTransactionInput,
  ctx: Ctx
) {
  ctx.session.authorize(['*', 'bde'])

  const user = await db.user.findUnique({ where: { id: data.user.connect?.id } })

  if (!user) {
    throw new Error("Utilisateur introuvable")
  }

  const article = await db.article.findUnique({ where: { id: data.article?.connect?.id } })

  if (!article) {
    throw new Error("Article introuvable")
  }

  const amount = Math.abs(user?.is_member ? article?.member_price : article?.price)

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
      where: { id: data?.user?.connect?.id }
    }),
  ])

  return transactionAndUser 
}
