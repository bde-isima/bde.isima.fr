import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type GetPromotionsInput = Pick<Prisma.PromotionFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, orderBy, skip = 0, take }: GetPromotionsInput) => {
    const promotions = await db.promotion.findMany({
      where,
      orderBy,
      take,
      skip
    })

    const count = await db.promotion.count({ where })
    const hasMore = typeof take === 'number' ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
      promotions,
      nextPage,
      hasMore,
      count
    }
  }
)
