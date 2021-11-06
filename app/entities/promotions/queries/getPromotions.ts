import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type GetPromotionsInput = Pick<
  Prisma.PromotionFindManyArgs,
  'include' | 'where' | 'orderBy' | 'skip' | 'take'
>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ include, where, orderBy, skip = 0, take }: GetPromotionsInput) => {
    const promotions = await db.promotion.findMany({
      include,
      where,
      orderBy,
      take,
      skip,
    })

    const count = await db.promotion.count({ where })
    const hasMore = typeof take === 'number' ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
      promotions,
      nextPage,
      hasMore,
      count,
    }
  }
)
