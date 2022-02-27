import { resolver } from 'blitz'

import db, { Prisma } from 'db'

type GetClubsInput = Pick<Prisma.ClubFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default resolver.pipe(async ({ where, orderBy, skip = 0, take }: GetClubsInput) => {
  const clubs = await db.club.findMany({
    where,
    orderBy,
    take,
    skip
  })

  const count = await db.club.count({ where })
  const hasMore = typeof take === 'number' ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    clubs,
    nextPage,
    hasMore,
    count
  }
})
