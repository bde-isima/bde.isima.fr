import { Ctx } from "blitz"

import db, { Prisma } from "db"

type UpdateUserInput = {
  data: Pick<Prisma.UserUpdateInput, "id" | "nickname" | "email">
  where: Prisma.UserWhereUniqueInput
}

export default async function updateUser({ where, data }: UpdateUserInput, ctx: Ctx) {
  ctx.session.authorize()

  if (ctx.session.userId !== where?.id) {
    throw new Error("Non autorisé")
  }

  const user = await db.user.update({ where, data })

  return user
}
