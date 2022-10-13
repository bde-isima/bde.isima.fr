import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpsertClubInput = Pick<Prisma.ClubUpsertArgs, 'where' | 'create' | 'update'>;

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ where, create, update }: UpsertClubInput) => {
  return await db.club.upsert({ where, update, create });
});
