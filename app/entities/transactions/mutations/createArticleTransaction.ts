import cuid from 'cuid';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type CreateTransactionInput = {
  data: Omit<Prisma.TransactionUncheckedCreateInput, 'type' | 'amount' | 'prevBalance'>;
};

export default resolver.pipe(resolver.authorize(['*', 'bde', 'listeux']), async ({ data }: CreateTransactionInput) => {
  const { userId, articleId, description } = data;

  const receiverUser = await db.user.findUniqueOrThrow({
    where: { id: userId },
    include: { userStats: true }
  });

  const article = await db.article.findUniqueOrThrow({
    where: { id: articleId! }
  });

  const amount = receiverUser.is_member ? article.member_price : article.price;

  // Update the number of articles bought stats
  const newStat =
    receiverUser.userStats?.articlesStats && receiverUser.userStats?.articlesStats[article.id]
      ? receiverUser.userStats?.articlesStats[article.id] + 1
      : 1;
  const upsertData = {
    articlesStats: {
      ...((receiverUser.userStats?.articlesStats as Prisma.JsonObject) ?? {}),
      [article.id]: newStat
    }
  };

  const transactionAndUser = await Promise.all([
    // Create DEBIT transaction for the user
    db.transaction.create({
      data: {
        amount,
        description,
        type: 'DEBIT',
        userId: receiverUser.id,
        articleId,
        prevBalance: receiverUser.balance
      }
    }),

    // Update balance of the user
    db.user.update({
      data: { balance: { decrement: amount } },
      where: { id: receiverUser.id }
    }),

    // Update userStats of the user
    db.userStats.upsert({
      create: {
        ...upsertData,
        user: { connect: { id: receiverUser.id } }
      },
      update: upsertData,
      where: { id: receiverUser.userStats?.id ?? cuid() }
    })
  ]);

  return transactionAndUser;
});
