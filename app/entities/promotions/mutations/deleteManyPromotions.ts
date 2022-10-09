import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type DeleteManyPromotionInput = Pick<Prisma.PromotionDeleteManyArgs, 'where'>;

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ where }: DeleteManyPromotionInput) => {
  return await db.promotion.deleteMany({ where });
});
