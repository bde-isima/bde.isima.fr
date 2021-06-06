import { resolver } from "blitz"

import db, { Prisma } from "db"

type GetEventSubscriptionsInput = Pick<
  Prisma.EventSubscriptionFindManyArgs,
  "include" | "where" | "orderBy" | "skip" | "take"
>

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take }: GetEventSubscriptionsInput) => {
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

    return {
      eventSubscriptions,
      nextPage,
      hasMore,
      count,
    }
  }
)
