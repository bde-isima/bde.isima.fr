import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type FindUniqueAnalyticInput = Pick<Prisma.AnalyticFindUniqueArgs, 'where'>;

export default resolver.pipe(resolver.authorize(), async ({ where }: FindUniqueAnalyticInput) => {
  try {
    return await db.analytic.findFirstOrThrow({ where });
  } catch {
    return null;
  }
});
