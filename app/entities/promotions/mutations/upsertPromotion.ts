import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpsertPromotionInput = Pick<Prisma.PromotionUpsertArgs, 'where' | 'create' | 'update'>;

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, create, update }: UpsertPromotionInput) => {
    return await db.promotion.upsert({ where, update, create });
  }
);
