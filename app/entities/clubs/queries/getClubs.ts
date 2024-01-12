import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetClubsInput = Pick<Prisma.ClubFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(async ({ where, orderBy, skip = 0, take }: GetClubsInput, ctx) => {
  console.log(ctx.session.roles);

  if (ctx.session.roles?.includes('*') != true && ctx.session.role?.includes('bde') != true) {
    const limit: Prisma.ClubWhereInput = {
      NOT: {
        OR: [{ name: 'listeux' }, { name: 'troll' }]
      }
    };

    if (where) {
      where = {
        AND: [where, limit]
      };
    } else {
      where = limit;
    }
  }

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
});
