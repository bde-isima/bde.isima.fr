import db, { Prisma } from "db"

type DeleteTransactionInput = Pick<Prisma.TransactionDeleteArgs, "where">

export default async function deleteTransaction({ where }: DeleteTransactionInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const transaction = await db.transaction.delete({ where })

  return transaction
}
