import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"

type FindUniqueUserInput = Pick<Prisma.FindUniqueUserArgs, "where">

export default async function getUserPublicData({ where }: FindUniqueUserInput, ctx: Ctx) {
  ctx.session.authorize()

  const user = await db.user.findFirst({
    where,
    select: { image: true },
  })

  if (!user) throw new NotFoundError()

  return user
}
