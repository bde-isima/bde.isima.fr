import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type DeleteEventSubscriptionInput = Pick<Prisma.EventSubscriptionDeleteArgs, 'where'>;

export default resolver.pipe(async ({ where }: DeleteEventSubscriptionInput, ctx: Ctx) => {
  const eventSubscription = await db.eventSubscription.findUniqueOrThrow({
    where,
    include: { event: { include: { club: true } } }
  });

  // If the request is done by another person than the subscriber, check for admin rights
  if (ctx.session.userId !== eventSubscription.userId) {
    ctx.session.$authorize(['*', 'bde', eventSubscription.event.club.name]);
  }
  // The user tries to unsubscribe
  else {
    ctx.session.$authorize();
  }

  return await db.eventSubscription.delete({ where });
});
