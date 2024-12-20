import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpsertPartnerInput = Pick<Prisma.PartnerUpsertArgs, 'where' | 'create' | 'update'>;

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, create, update }: UpsertPartnerInput) => {
    return await db.partner.upsert({ where, update, create });
  }
);
