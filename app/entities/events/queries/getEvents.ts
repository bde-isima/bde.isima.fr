import { resolver } from "blitz"

import db, { Prisma } from "db"

type GetEventsInput = Pick<
  Prisma.EventFindManyArgs,
  "include" | "where" | "orderBy" | "skip" | "take"
>

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take }: GetEventsInput) => {
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
)
