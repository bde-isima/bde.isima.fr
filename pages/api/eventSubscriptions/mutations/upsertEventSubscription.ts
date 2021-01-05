import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"
import { assertArrayNonEmpty } from "app/utils/assert"

type upsertEventSubscriptionInput = Pick<
  Prisma.EventSubscriptionUpsertArgs,
  "where" | "create" | "update"
>

export default async function upsertEventSubscription(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { where, create, update }: upsertEventSubscriptionInput = req.body

  const event = await db.event.findUnique({ where: { id: create.event.connect?.id } })

  if (!event) {
    return res.status(404).json({ message: "Événement introuvable" })
  }

  if (event.products.length > 0) {
    assertArrayNonEmpty("Le panier", create.cart)
  }

  const eventSubscriptions = await db.eventSubscription.count({
    where: {
      eventId: create.event.connect?.id,
      userId: { not: create.user.connect?.id },
    },
  })

  if (event.max_subscribers && event.max_subscribers <= eventSubscriptions) {
    return res.status(403).json({ message: "Événement plein" })
  }

  const eventSubscription = await db.eventSubscription.upsert({ where, update, create })

  res.status(200).json(eventSubscription)
}
