import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetPartnersInput = Pick<Prisma.PartnerFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, orderBy, skip = 0, take }: GetPartnersInput, _ctx) => {
    const partners = await db.partner.findMany({
      where,
      orderBy,
      take,
      skip
    });

    const count = await db.partner.count({ where });
    const hasMore = typeof take === 'number' ? skip + take < count : false;
    const nextPage = hasMore ? { take, skip: skip + take! } : null;

    return {
      partners,
      nextPage,
      hasMore,
      count
    };
  }
);
