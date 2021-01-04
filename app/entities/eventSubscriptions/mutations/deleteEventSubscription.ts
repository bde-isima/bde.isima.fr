import db, { Prisma } from "db"

type DeleteEventSubscriptionInput = Pick<Prisma.EventSubscriptionDeleteArgs, "where">

export default async function deleteEventSubscription({ where }: DeleteEventSubscriptionInput) {
  const eventSubscription = await db.eventSubscription.findUnique({
    where,
    include: { event: { include: { club: true } } },
  })

  if (eventSubscription) {
    //TODO
    // If the request is done by another person than the subscriber, check for admin rights
    /*if(session?.userId !== eventSubscription.userId) {
      session?.authorize(['*', 'bde', eventSubscription.event.club.name])
    }
    // The user tries to unsubscribe
    else {
      session?.authorize()
    }*/

    const newEventSubscription = await db.eventSubscription.delete({ where })

    return newEventSubscription
  }
}
