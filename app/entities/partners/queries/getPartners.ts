import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type GetPartnersInput = Pick<Prisma.PartnerFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default resolver.pipe(async ({ where, orderBy, skip = 0, take }: GetPartnersInput) => {
  const partners = await db.partner.findMany({
    where,
    orderBy,
    take,
    skip
  })

  const count = await db.partner.count({ where })
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    partners,
    nextPage,
    hasMore,
    count
  }
})
