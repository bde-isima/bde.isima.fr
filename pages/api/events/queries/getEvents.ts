import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetEventsInput = Pick<
  Prisma.FindManyEventArgs,
  "where" | "include" | "orderBy" | "skip" | "take"
>

export default async function getEvents(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { where, orderBy, include, skip = 0, take }: GetEventsInput = req.body

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

  res.status(200).json({
    events,
    nextPage,
    hasMore,
    count,
  })
}
