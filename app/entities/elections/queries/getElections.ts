import { resolver } from 'blitz'
import db, { Prisma } from 'db'

type GetElectionsInput = Pick<
  Prisma.ElectionFindManyArgs,
  'where' | 'orderBy' | 'skip' | 'take' | 'include'
>

export default resolver.pipe(
  resolver.authorize(['*']),
  async ({ include, where, orderBy, skip = 0, take }: GetElectionsInput) => {
    const elections = await db.election.findMany({
      where,
      orderBy,
      take,
      skip,
      include
    })

    const count = await db.election.count({ where })
    const hasMore = typeof take === 'number' ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
      elections,
      nextPage,
      hasMore,
      count
    }
  }
)
