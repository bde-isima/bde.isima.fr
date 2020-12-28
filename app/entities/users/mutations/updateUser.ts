import { Ctx } from "blitz"
import db, { Prisma } from "db"
import { hashPassword } from "app/auth/auth-utils"

type UpdateUserInput = { 
  data: Pick<Prisma.UserUpdateInput, "id" | "nickname" | "password" | "email">
  where: Prisma.UserWhereUniqueInput
}

export default async function updateUser({ where, data }: UpdateUserInput, ctx: Ctx) {
  ctx.session.authorize()

  if (ctx.session.userId !== data?.id) {
    throw new Error("Non autorisé")
  }

  if (data.password) {
    data.password = await hashPassword(data.password as string)
  }

  const user = await db.user.update({ where, data })

  return user
}
