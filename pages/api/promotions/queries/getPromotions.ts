import { NextApiRequest, NextApiResponse } from "next"

import db, { Prisma } from "db"

type GetPromotionsInput = Pick<Prisma.FindManyPromotionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPromotions(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize(['*', 'bde'])

  const { where, orderBy, skip = 0, take }: GetPromotionsInput = req.body

  const promotions = await db.promotion.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.promotion.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  res.status(200).json({
    promotions,
    nextPage,
    hasMore,
    count,
  })
}
