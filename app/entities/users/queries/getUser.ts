import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"

type FinduniqueUserInput = Pick<Prisma.FindUniqueUserArgs, "where">

export default async function getUser({ where }: FinduniqueUserInput, ctx: Ctx) {
  ctx.session.authorize()

  const user = await db.user.findFirst({ 
    where,
    select: { image: true }
  })

  if (!user) throw new NotFoundError()

  return user
}
