import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetVoteRequestsInput = Pick<Prisma.VoteRequestFindManyArgs, 'include' | 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(
  resolver.authorize(['*']),
  async ({ include, where, orderBy, skip = 0, take }: GetVoteRequestsInput) => {
    const voteRequests = await db.voteRequest.findMany({
      include,
      where,
      orderBy,
      take,
      skip
    });

    const count = await db.voteRequest.count({ where });
    const hasMore = typeof take === 'number' ? skip + take < count : false;
    const nextPage = hasMore ? { take, skip: skip + take! } : null;

    return {
      voteRequests,
      nextPage,
      hasMore,
      count
    };
  }
);
