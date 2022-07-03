import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type GetUsersInput = Pick<
  Prisma.UserFindManyArgs,
  'include' | 'where' | 'orderBy' | 'skip' | 'take'
>

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ include, where, orderBy, skip = 0, take }: GetUsersInput) => {
    const users = await db.user.findMany({
      include,
      where,
      orderBy,
      take,
      skip
    })

    const count = await db.user.count({ where })
    const hasMore = typeof take === 'number' ? skip + take < count : false
    const nextPage = hasMore ? { take, skip: skip + take! } : null

    return {
      users,
      nextPage,
      hasMore,
      count
    }
  }
)
