import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma, PaymentMethod } from "db"

type GetEventSubscriptionInput = Pick<Prisma.FindFirstEventSubscriptionArgs, "where" | "include">

export default async function getEventSubscription(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { where }: GetEventSubscriptionInput = req.body

  const eventSubscription = await db.eventSubscription.findFirst({ where })

  if (!eventSubscription) {
    res.status(204).json({
      eventId: where?.eventId?.toString(),
      userId: where?.userId?.toString(),
      payment_method: PaymentMethod.BDE,
      cart: [],
    })
  }

  res.status(200).json(eventSubscription)
}
