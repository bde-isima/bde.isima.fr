import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetTransactionsInput = Pick<Prisma.TransactionFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take }: GetTransactionsInput, ctx: Ctx) => {
    if (ctx.session.userId !== where?.userId) {
      ctx.session.$authorize(['*', 'bde', 'listeux']);
    }

    const transactions = await db.transaction.findMany({
      where,
      orderBy,
      take,
      skip
    });

    const count = await db.transaction.count({ where });
    const hasMore = typeof take === 'number' ? skip + take < count : false;
    const nextPage = hasMore ? { take, skip: skip + take! } : null;

    return {
      transactions,
      nextPage,
      hasMore,
      count
    };
  }
);
