import { Ctx } from "blitz"

import db, { Prisma } from "db"
import { assertArrayNonEmpty } from "app/utils/assert"

type upsertEventSubscriptionInput = Pick<
  Prisma.EventSubscriptionUpsertArgs,
  "where" | "create" | "update"
>

export default async function upsertEventSubscription(
  { where, create, update }: upsertEventSubscriptionInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const event = await db.event.findUnique({ where: { id: create.event?.connect?.id } })

  if (!event) {
    throw new Error("Événement introuvable")
  }

  if (event.products.length > 0) {
    assertArrayNonEmpty("Le panier", create.cart)
  }

  const eventSubscriptions = await db.eventSubscription.count({
    where: {
      eventId: create.event?.connect?.id,
      userId: { not: create.user?.connect?.id },
    },
  })

  if (event.max_subscribers && event.max_subscribers <= eventSubscriptions) {
    throw new Error("Événement plein")
  }

  if (new Date() > event.subscriptions_end_at) {
    throw new Error("Inscriptions closes")
  }

  const eventSubscription = await db.eventSubscription.upsert({ where, update, create })

  return eventSubscription
}
