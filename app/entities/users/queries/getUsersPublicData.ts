import { resolver } from 'blitz'
import db, { Prisma } from 'db'

type GetUsersInput = Pick<Prisma.UserFindManyArgs, 'where' | 'orderBy' | 'skip' | 'take'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take }: GetUsersInput) => {
    const users = await db.user.findMany({
      where,
      orderBy,
      take,
      skip,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        nickname: true,
        card: true,
      },
    })

    const count = await db.user.count({ where })
    const hasMore = typeof take === 'number' ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
      users,
      nextPage,
      hasMore,
      count,
    }
  }
)
