import { Ctx, resolver } from 'blitz'

import db, { Prisma } from 'db'

type CreateEventSubscriptionInput = Pick<Prisma.EventSubscriptionCreateArgs, 'data'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ data }: CreateEventSubscriptionInput, ctx: Ctx) => {
    const event = await db.event.findUnique({
      where: { id: data.event?.connect?.id },
      include: { club: true },
      rejectOnNotFound: true
    })

    ctx.session.$authorize(['*', 'bde', event.club.name])

    const user = await db.user.findUnique({
      where: { id: data.user?.connect?.id },
      rejectOnNotFound: true
    })

    const existingSub = await db.eventSubscription.findFirst({
      where: {
        eventId: event.id,
        userId: user.id
      }
    })

    if (existingSub) {
      throw new Error('Déjà inscrit')
    }

    return await db.eventSubscription.create({ data })
  }
)
