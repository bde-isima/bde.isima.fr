import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetClubsInput = Pick<Prisma.ClubFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take }: GetClubsInput, _ctx) => {
    const clubs = await db.club.findMany({
      where,
      orderBy,
      take,
      skip
    });

    const count = await db.club.count({ where });
    const hasMore = typeof take === 'number' ? skip + take < count : false;
    const nextPage = hasMore ? { take, skip: skip + take! } : null;

    return {
      clubs,
      nextPage,
      hasMore,
      count
    };
  }
);
