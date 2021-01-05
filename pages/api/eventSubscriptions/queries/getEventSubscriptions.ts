import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetEventSubscriptionsInput = Pick<
  Prisma.FindManyEventSubscriptionArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getEventSubscriptions(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { where, orderBy, skip = 0, take, include }: GetEventSubscriptionsInput = req.body

  const eventSubscriptions = await db.eventSubscription.findMany({
    where,
    orderBy,
    take,
    skip,
    include,
  })

  const count = await db.eventSubscription.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  res.status(200).json({
    eventSubscriptions,
    nextPage,
    hasMore,
    count,
  })
}
