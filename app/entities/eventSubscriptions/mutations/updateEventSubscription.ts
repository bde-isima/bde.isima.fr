import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"

type UpdateEventSubscriptionInput = Pick<Prisma.EventSubscriptionUpdateArgs, "where" | "data">

export default async function updateEventSubscription(
  { where, data }: UpdateEventSubscriptionInput,
  ctx: Ctx
) {
  const eventSubscription = await db.eventSubscription.findUnique({
    where,
    include: { event: { include: { club: true } } },
  })

  if (!eventSubscription) {
    throw new NotFoundError("Inscription introuvable")
  }

  ctx.session.authorize(["*", "bde", eventSubscription.event.club.name])

  const newEventSubscription = await db.eventSubscription.update({ where, data })

  return newEventSubscription
}
