import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetEventSubscriptionsInput = Pick<
  Prisma.FindManyEventSubscriptionArgs,
  "where" | "orderBy" | "skip" | "take" | "include"
>

export default async function getEventSubscriptions(
  { where, orderBy, skip = 0, take, include }: GetEventSubscriptionsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

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
