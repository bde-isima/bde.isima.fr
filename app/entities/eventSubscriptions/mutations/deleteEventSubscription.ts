import { Ctx } from "blitz"

import db, { Prisma } from "db"

type DeleteEventSubscriptionInput = Pick<Prisma.EventSubscriptionDeleteArgs, "where">

export default async function deleteEventSubscription(
  { where }: DeleteEventSubscriptionInput,
  ctx: Ctx
) {
  const eventSubscription = await db.eventSubscription.findUnique({ 
    where,
    include: { event: { include: { club: true }} }
  })

  if (eventSubscription) {
    // If the request is done by another person than the subscriber, check for admin rights
    if(ctx.session.userId !== eventSubscription.userId) {
      ctx.session.authorize(['*', 'bde', eventSubscription.event.club.name])
    }
    // The user tries to unsubscribe
    else {
      ctx.session.authorize()
    }
  
    const newEventSubscription = await db.eventSubscription.delete({ where })
  
    return newEventSubscription
  }
}
