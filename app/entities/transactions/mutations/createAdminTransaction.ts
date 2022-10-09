import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type CreateTransactionInput = {
  data: Omit<Prisma.TransactionCreateInput, 'type' | 'prevBalance'>;
};

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ data }: CreateTransactionInput) => {
  const user = await db.user.findUniqueOrThrow({
    where: { id: data?.user?.connect?.id }
  });

  const amount = Math.abs(data.amount);

  const transactionAndUser = await Promise.all([
    // Create CREDIT or DEBIT transaction for receiver
    db.transaction.create({
      data: {
        ...data,
        type: data.amount > 0 ? 'CREDIT' : 'DEBIT',
        amount,
        prevBalance: user.balance
      }
    }),

    // Update balance of the receiver
    db.user.update({
      data: { balance: { [data.amount > 0 ? 'increment' : 'decrement']: amount } },
      where: { id: data?.user?.connect?.id }
    })
  ]);

  return transactionAndUser;
});
