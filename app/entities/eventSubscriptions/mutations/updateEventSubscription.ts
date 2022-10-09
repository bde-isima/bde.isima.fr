import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpdateEventSubscriptionInput = Pick<Prisma.EventSubscriptionUpdateArgs, 'where' | 'data'>;

export default resolver.pipe(async ({ where, data }: UpdateEventSubscriptionInput, ctx: Ctx) => {
  const eventSubscription = await db.eventSubscription.findUniqueOrThrow({
    where,
    include: { event: { include: { club: true } } }
  });

  ctx.session.$authorize(['*', 'bde', eventSubscription.event.club.name]);

  return await db.eventSubscription.update({ where, data });
});
