import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type CreateEventSubscriptionInput = Pick<Prisma.EventSubscriptionCreateArgs, "data">

export default async function createEventSubscription(req: NextApiRequest, res: NextApiResponse) {
  const { data }: CreateEventSubscriptionInput = req.body

  const event = await db.event.findUnique({
    where: { id: data.event.connect?.id },
    include: { club: true },
  })

  if (!event) {
    return res.status(404).json({ message: "Événement introuvable" })
  }

  //TODO ctx.session.authorize(['*', 'bde', event.club.name])

  const user = await db.user.findUnique({ where: { id: data.user.connect?.id } })

  if (!user) {
    return res.status(404).json({ message: "Utilisateur introuvable" })
  }

  const existingSub = await db.eventSubscription.findFirst({
    where: {
      eventId: data.event.connect?.id,
      userId: data.user.connect?.id,
    },
  })

  if (existingSub) {
    return res.status(208).json({ message: "Déjà inscrit" })
  }

  const eventSubscription = await db.eventSubscription.create({ data })

  res.status(200).json(eventSubscription)
}
