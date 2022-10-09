import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

type upsertEventInput = Pick<Prisma.EventUpsertArgs, 'where' | 'create' | 'update'>;

export default async function upsertEvent({ where, create, update }: upsertEventInput, ctx: Ctx) {
  ctx.session.$authorize(['*', 'bde', create.club?.connect?.name || 'bde', update?.club?.connect?.name || 'bde']);

  return await db.event.upsert({ where, update, create });
}
