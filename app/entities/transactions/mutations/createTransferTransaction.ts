import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type CreateTransactionInput = {
  data: Omit<Prisma.TransactionCreateInput, 'type' | 'prevBalance'>;
};

export default resolver.pipe(resolver.authorize(), async ({ data }: CreateTransactionInput, { session }: Ctx) => {
  const { amount, description } = data;

  if (session.userId !== data?.emitter?.connect?.id) {
    throw new Error("Vous n'êtes pas l'émetteur");
  }

  if (amount < 0) {
    throw new Error('Montant incorrect');
  }

  if (data.user.connect?.id === data?.emitter?.connect?.id) {
    throw new Error("Vous ne pouvez pas vous envoyer de l'argent");
  }

  const receiverUser = await db.user.findUniqueOrThrow({
    where: { id: data?.user?.connect?.id }
  });

  const emitterUser = await db.user.findUniqueOrThrow({
    where: { id: data?.emitter?.connect?.id }
  });

  if (amount > emitterUser.balance) {
    throw new Error('Solde insuffisant');
  }

  const transactionsAndUsers = await Promise.all([
    // Create CREDIT transaction for receiver
    db.transaction.create({
      data: {
        amount,
        description,
        type: 'CREDIT',
        userId: receiverUser.id,
        emitterId: emitterUser.id,
        prevBalance: receiverUser.balance
      }
    }),

    // Create DEBIT transaction for the emitter
    db.transaction.create({
      data: {
        amount,
        description,
        type: 'DEBIT',
        userId: emitterUser.id,
        prevBalance: emitterUser.balance
      }
    }),

    // Update balance of the receiver
    db.user.update({
      data: { balance: { increment: data.amount } },
      where: { id: receiverUser.id }
    }),

    // Update balance of the emitter
    db.user.update({
      data: { balance: { decrement: data.amount } },
      where: { id: emitterUser.id }
    })
  ]);

  return transactionsAndUsers;
});
