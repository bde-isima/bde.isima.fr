import db, { Prisma } from "db"

type UpdateEventSubscriptionInput = Pick<Prisma.EventSubscriptionUpdateArgs, "where" | "data">

export default async function updateEventSubscription({
  where,
  data,
}: UpdateEventSubscriptionInput) {
  const eventSubscription = await db.eventSubscription.findUnique({
    where,
    include: { event: { include: { club: true } } },
  })

  if (!eventSubscription) {
    throw new Error("Inscription introuvable")
  }

  //TODO ctx.session.authorize(['*', 'bde', eventSubscription.event.club.name])

  const newEventSubscription = await db.eventSubscription.update({ where, data })

  return newEventSubscription
}
