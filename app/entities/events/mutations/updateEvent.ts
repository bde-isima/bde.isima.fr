import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpdateEventInput = Pick<Prisma.EventUpdateArgs, 'where' | 'data'>;

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ where, data }: UpdateEventInput) => {
  return await db.event.update({ where, data });
});
