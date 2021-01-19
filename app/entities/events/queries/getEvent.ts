import { Ctx, NotFoundError } from "blitz"

import db, { Prisma, PaymentMethod } from "db"

type FindUniqueEventInput = Pick<Prisma.FindUniqueEventArgs, "where" | "include">

export default async function getEvent({ where, include }: FindUniqueEventInput, ctx: Ctx) {
  ctx.session.authorize()

  const event: any = await db.event.findFirst({ where, include })

  if (!event) throw new NotFoundError()

  const includeSub = include?.EventSubscription as Prisma.FindManyEventSubscriptionArgs

  if (includeSub?.where?.userId && event.EventSubscription.length === 0) {
    event.EventSubscription[0] = {
      eventId: where?.id,
      userId: includeSub?.where?.userId,
      payment_method: PaymentMethod.BDE,
      cart: [],
    }
  }

  return event
}
