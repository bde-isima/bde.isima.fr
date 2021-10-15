import { Ctx, resolver } from 'blitz'

import db, { Prisma } from 'db'

type UpdateEventSubscriptionInput = Pick<Prisma.EventSubscriptionUpdateArgs, 'where' | 'data'>

export default resolver.pipe(async ({ where, data }: UpdateEventSubscriptionInput, ctx: Ctx) => {
  const eventSubscription = await db.eventSubscription.findUnique({
    where,
    include: { event: { include: { club: true } } },
    rejectOnNotFound: true,
  })

  ctx.session.$authorize(['*', 'bde', eventSubscription.event.club.name])

  return await db.eventSubscription.update({ where, data })
})
