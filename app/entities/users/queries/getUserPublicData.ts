import { resolver } from "blitz"

import db, { Prisma } from "db"

type FindUniqueUserInput = Pick<Prisma.UserFindUniqueArgs, "where">

export default resolver.pipe(resolver.authorize(), async ({ where }: FindUniqueUserInput) => {
  return await db.user.findFirst({
    where,
    select: { image: true },
    rejectOnNotFound: true,
  })
})
