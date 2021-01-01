import { Ctx } from "blitz"

import db, { Prisma } from "db"

type GetCurrentUserInput = Pick<Prisma.FindUniqueUserArgs, "include">

export default async function getCurrentUser({ include }: GetCurrentUserInput, ctx: Ctx) {
  ctx.session.authorize() //Custom addition to ensure all pages that use this query are authorized

  if (!ctx.session.userId) {
    return null
  }

  return db.user.findUnique({ 
    where: { id: ctx.session.userId },
    include,
  })
}
