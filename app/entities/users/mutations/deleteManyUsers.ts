import { Ctx } from "blitz"

import db, { Prisma } from "db"

type DeleteManyUserInput = Pick<Prisma.UserDeleteManyArgs, "where">

export default async function deleteManyUsers({ where }: DeleteManyUserInput, ctx: Ctx) {
  ctx.session.authorize(["*"])

  const users = await db.user.deleteMany({ where })

  return users
}
