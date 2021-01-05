import { getSession } from "next-auth/client"
import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type CreateTransactionInput = { data: Omit<Prisma.TransactionCreateInput, "type" | "prevBalance"> }

export default async function createTransferTransaction(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession()

  const { data }: CreateTransactionInput = req.body

  //TODO ctx.session.authorize()

  if (session?.userId !== data?.emitter?.connect?.id) {
    return res.status(403).json({ message: "Vous n'êtes pas l'émetteur" })
  }

  if (data.amount < 0) {
    return res.status(403).json({ message: "Pas de transaction négative" })
  }

  if (data.user.connect?.id === data?.emitter?.connect?.id) {
    return res.status(403).json({ message: "Vous ne pouvez pas vous envoyer de l'argent" })
  }

  const user = await db.user.findUnique({ where: { id: data?.user?.connect?.id } })

  if (!user) {
    return res.status(404).json({ message: "Receveur introuvable" })
  }

  const emitter = await db.user.findUnique({ where: { id: data?.emitter?.connect?.id } })

  if (!emitter) {
    return res.status(404).json({ message: "Émetteur introuvable" })
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

  res.status(200).json(transactionsAndUsers)
}
