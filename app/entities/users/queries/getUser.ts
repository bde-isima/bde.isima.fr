import { Ctx, NotFoundError } from "blitz"

import db, { Prisma } from "db"

type FindUniqueUserInput = Pick<Prisma.FindUniqueUserArgs, "where">

export default async function getUser({ where }: FindUniqueUserInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const user = await db.user.findFirst({ where })

  if (!user) throw new NotFoundError()

  return user
}
