import { resolver } from '@blitzjs/rpc'
import { Ctx } from 'blitz'

import db, { Prisma } from 'db'

type GetCurrentUserInput = Pick<Prisma.UserFindUniqueArgs, 'include'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ include }: GetCurrentUserInput, { session }: Ctx) => {
    if (!session.userId) {
      return null
    }

    return await db.user.findUniqueOrThrow({
      where: { id: session.userId },
      include
    })
  }
)
