import { Ctx, resolver } from 'blitz'

import db, { Prisma } from 'db'

type GetCurrentUserInput = Pick<Prisma.UserFindUniqueArgs, 'include'>

export default resolver.pipe(
  resolver.authorize(),
  async ({ include }: GetCurrentUserInput, { session }: Ctx) => {
    if (!session.userId) {
      return null
    }

    return await db.user.findUnique({
      where: { id: session.userId },
      include,
      rejectOnNotFound: true
    })
  }
)
