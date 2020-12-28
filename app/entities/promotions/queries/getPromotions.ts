import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetPromotionsInput = Pick<Prisma.FindManyPromotionArgs, "where" | "orderBy" | "skip" | "take">

export default async function getPromotions(
  { where, orderBy, skip = 0, take }: GetPromotionsInput,
  ctx: Ctx
) {
  ctx.session.authorize(['*', 'bde'])

  const promotions = await db.promotion.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.promotion.count({ where })
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    promotions,
    nextPage,
    hasMore,
    count,
  }
}
