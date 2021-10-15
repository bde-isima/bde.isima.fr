import { Ctx, resolver } from 'blitz'

import db, { Prisma } from 'db'

type DeleteEventSubscriptionInput = Pick<Prisma.EventSubscriptionDeleteArgs, 'where'>

export default resolver.pipe(async ({ where }: DeleteEventSubscriptionInput, ctx: Ctx) => {
  const eventSubscription = await db.eventSubscription.findUnique({
    where,
    include: { event: { include: { club: true } } },
    rejectOnNotFound: true,
  })

  // If the request is done by another person than the subscriber, check for admin rights
  if (ctx.session.userId !== eventSubscription.userId) {
    ctx.session.$authorize(['*', 'bde', eventSubscription.event.club.name])
  }
  // The user tries to unsubscribe
  else {
    ctx.session.$authorize()
  }

  return await db.eventSubscription.delete({ where })
})
