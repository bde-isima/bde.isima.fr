import { resolver } from "@blitzjs/rpc";

import db, { Prisma } from 'db'

type DeleteManyUserInput = Pick<Prisma.UserDeleteManyArgs, 'where'>

export default resolver.pipe(resolver.authorize(['*']), async ({ where }: DeleteManyUserInput) => {
  return await db.user.deleteMany({ where })
})
