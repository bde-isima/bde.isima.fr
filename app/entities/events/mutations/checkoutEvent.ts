import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"
import { CartItem, Option } from "types"

type UpdateEventInput = Pick<Prisma.EventUpdateArgs, "where">

export default async function checkoutEvent({ where }: UpdateEventInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const event = await db.event.findUnique({ where })

  if (!event) {
    throw new NotFoundError("Événement introuvable")
  }

  const eventSubscriptions = await db.eventSubscription.findMany({
    where: { eventId: where.id },
    include: { user: true },
  })

  const transactionsAndUsers = await Promise.all(
    eventSubscriptions.map((s) => {
      if (s.payment_method === "BDE") {
        const d = new Date(event?.takes_place_at)

        //Compute total amount
        const amount = (s as any).cart.reduce((acc: number, val: CartItem) => {
          return (
            acc +
            val.quantity *
              (val.price + val.options.reduce((acc: number, val: Option) => acc + val.price, 0))
          )
        }, 0)

        if (amount > 0) {
          // Create DEBIT transaction for the user who participated in this event
          return Promise.all([
            db.transaction.create({
              data: {
                amount,
                description: `${d.getDay()}/${d.getMonth()}/${d.getFullYear()} - ${event.name}`,
                type: "DEBIT",
                user: { connect: { id: s.userId } },
                prevBalance: s.user.balance,
              },
            }),
            // Update the balance of the user who participated in this event
            db.user.update({
              where: { id: s.userId },
              data: { balance: { decrement: amount } },
            }),
          ])
        }
      }

      return Promise.resolve()
    }) as any
  )

  const newEvent = await db.event.update({
    where,
    data: { status: "CHECKED_OUT" },
  })

  return {
    transactionsAndUsers,
    newEvent,
  }
}
