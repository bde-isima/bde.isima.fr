import { Ctx } from "blitz"

import db, { Prisma, PaymentMethod } from "db"

type GetEventSubscriptionInput = Pick<Prisma.FindFirstEventSubscriptionArgs, "where" | "include">

export default async function getEventSubscription({ where }: GetEventSubscriptionInput, ctx: Ctx) {
  ctx.session.authorize()

  const eventSubscription = await db.eventSubscription.findFirst({ where })

  if (!eventSubscription) {
    return Promise.resolve({
      eventId: where?.eventId,
      userId: where?.userId,
      payment_method: PaymentMethod.BDE,
      cart: [],
    })
  }

  return eventSubscription
}
