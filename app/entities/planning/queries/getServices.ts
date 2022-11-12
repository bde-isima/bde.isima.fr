import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetServicesInput = Pick<Prisma.ArticleFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy, skip = 0, take }: GetServicesInput) => {
  const services = await db.service.findMany({
    where,
    orderBy: { startDate: 'asc' },
    take,
    skip
  });

  const count = await db.service.count({ where });
  const hasMore = typeof take === 'number' ? skip + take < count : false;
  const nextPage = hasMore ? { take, skip: skip + take! } : null;

  return {
    services,
    nextPage,
    hasMore,
    count
  };
});
