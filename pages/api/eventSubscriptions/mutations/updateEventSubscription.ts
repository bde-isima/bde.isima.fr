import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type UpdateEventSubscriptionInput = Pick<Prisma.EventSubscriptionUpdateArgs, "where" | "data">

export default async function updateEventSubscription(req: NextApiRequest, res: NextApiResponse) {
  const { where, data }: UpdateEventSubscriptionInput = req.body

  const eventSubscription = await db.eventSubscription.findUnique({
    where,
    include: { event: { include: { club: true } } },
  })

  if (!eventSubscription) {
    return res.status(404).json({ message: "Inscription introuvable" })
  }

  //TODO ctx.session.authorize(['*', 'bde', eventSubscription.event.club.name])

  const newEventSubscription = await db.eventSubscription.update({ where, data })

  res.status(200).json(newEventSubscription)
}
