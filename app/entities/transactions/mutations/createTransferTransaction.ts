import { Ctx } from "blitz"

import db, { Prisma } from "db"

type CreateTransactionInput = { data: Omit<Prisma.TransactionCreateInput, "type" | "prevBalance"> }

export default async function createTransferTransaction(
  { data }: CreateTransactionInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  if (ctx.session.userId !== data?.emitter?.connect?.id) {
    throw new Error("Vous n'êtes pas l'émetteur")
  }

  if (data.amount < 0) {
    throw new Error("Montant incorrect")
  }

  if (data.user.connect?.id === data?.emitter?.connect?.id) {
    throw new Error("Vous ne pouvez pas vous envoyer de l'argent")
  }

  const user = await db.user.findUnique({ where: { id: data?.user?.connect?.id } })

  if (!user) {
    throw new Error("Receveur introuvable")
  }

  const emitter = await db.user.findUnique({ where: { id: data?.emitter?.connect?.id } })

  if (!emitter) {
    throw new Error("Émetteur introuvable")
  }

  if (data.amount > emitter.balance) {
    throw new Error("Solde insuffisant")
  }

  const transactionsAndUsers = await Promise.all([
    // Create CREDIT transaction for receiver
    db.transaction.create({
      data: {
        ...data,
        type: "CREDIT",
        prevBalance: user.balance,
      },
    }),

    // Create DEBIT transaction for the emitter
    db.transaction.create({
      data: {
        ...data,
        type: "DEBIT",
        user: { connect: { id: emitter.id } },
        prevBalance: emitter.balance,
      },
    }),

    // Update balance of the receiver
    db.user.update({
      data: { balance: { increment: data.amount } },
      where: { id: data?.user?.connect?.id },
    }),

    // Update balance of the emitter
    db.user.update({
      data: { balance: { decrement: data.amount } },
      where: { id: data?.emitter?.connect?.id },
    }),
  ])

  return transactionsAndUsers
}
