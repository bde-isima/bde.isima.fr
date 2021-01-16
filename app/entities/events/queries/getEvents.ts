import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetEventsInput = Pick<
  Prisma.FindManyEventArgs,
  "where" | "include" | "orderBy" | "skip" | "take"
>

export default async function getEvents(
  { where, orderBy, include, skip = 0, take }: GetEventsInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const events = await db.event.findMany({
    where,
    orderBy,
    include,
    take,
    skip,
  })

  const count = await db.event.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    events,
    nextPage,
    hasMore,
    count,
  }
}
