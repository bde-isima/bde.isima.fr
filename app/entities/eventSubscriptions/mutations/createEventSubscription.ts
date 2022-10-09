import { resolver } from '@blitzjs/rpc'
import { Ctx } from 'blitz'

import db, { Prisma } from 'db'

type CreateEventSubscriptionInput = Pick<Prisma.EventSubscriptionCreateArgs, 'data'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ data }: CreateEventSubscriptionInput, ctx: Ctx) => {
    const event = await db.event.findUniqueOrThrow({
      where: { id: data.event?.connect?.id },
      include: { club: true }
    })

    ctx.session.$authorize(['*', 'bde', event.club.name])

    const user = await db.user.findUniqueOrThrow({
      where: { id: data.user?.connect?.id }
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
