import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type CreateTransactionInput = { data: Omit<Prisma.TransactionCreateInput, "type" | "prevBalance"> }

export default async function createAdminTransaction(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { data }: CreateTransactionInput = req.body

  const user = await db.user.findUnique({ where: { id: data?.user?.connect?.id } })

  if (!user) {
    return res.status(404).json({ message: "Receveur introuvable" })
  }

  const amount = Math.abs(data.amount)

  const transactionAndUser = await Promise.all([
    // Create CREDIT or DEBIT transaction for receiver
    db.transaction.create({
      data: {
        ...data,
        type: data.amount > 0 ? "CREDIT" : "DEBIT",
        amount,
        prevBalance: user.balance,
      },
    }),

    // Update balance of the receiver
    db.user.update({
      data: { balance: { [data.amount > 0 ? "increment" : "decrement"]: amount } },
      where: { id: data?.user?.connect?.id },
    }),
  ])

  res.status(200).json(transactionAndUser)
}
