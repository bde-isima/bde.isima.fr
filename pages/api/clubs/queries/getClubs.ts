import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetClubsInput = Pick<Prisma.FindManyClubArgs, "where" | "orderBy" | "skip" | "take">

export default async function getClubs(req: NextApiRequest, res: NextApiResponse) {
  //ctx.session.authorize()

  const { where, orderBy, skip = 0, take }: GetClubsInput = req.body

  const clubs = await db.club.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.club.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  res.status(200).json({
    clubs,
    nextPage,
    hasMore,
    count,
  })
}
