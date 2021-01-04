import db, { Prisma } from "db"

type CreateEventSubscriptionInput = Pick<Prisma.EventSubscriptionCreateArgs, "data">

export default async function createEventSubscription({ data }: CreateEventSubscriptionInput) {
  const event = await db.event.findUnique({
    where: { id: data.event.connect?.id },
    include: { club: true },
  })

  if (!event) {
    throw new Error("Événement introuvable")
  }

  //TODO ctx.session.authorize(['*', 'bde', event.club.name])

  const user = await db.user.findUnique({ where: { id: data.user.connect?.id } })

  if (!user) {
    throw new Error("Utilisateur introuvable")
  }

  const existingSub = await db.eventSubscription.findFirst({
    where: {
      eventId: data.event.connect?.id,
      userId: data.user.connect?.id,
    },
  })

  if (existingSub) {
    throw new Error("Déjà inscrit")
  }

  const eventSubscription = await db.eventSubscription.create({ data })

  return eventSubscription
}
