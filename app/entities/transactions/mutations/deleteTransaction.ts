import { Ctx } from "blitz"
import db, { TransactionDeleteArgs } from "db"

type DeleteTransactionInput = Pick<TransactionDeleteArgs, "where">

export default async function deleteTransaction({ where }: DeleteTransactionInput, ctx: Ctx) {
  ctx.session.authorize(['*', 'bde'])

  const transaction = await db.transaction.delete({ where })

  return transaction
}
