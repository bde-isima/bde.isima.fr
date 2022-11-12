import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpsertServiceInput = Pick<Prisma.ServiceUpsertArgs, 'where' | 'create' | 'update'>;

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, create, update }: UpsertServiceInput, _: Ctx) => {
    return await db.service.upsert({ where, update, create });
  }
);
