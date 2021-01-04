import { getSession } from "next-auth/client"

import db, { Prisma } from "db"

type UpdateUserInput = {
  data: Pick<Prisma.UserUpdateInput, "id" | "nickname" | "password" | "email">
  where: Prisma.UserWhereUniqueInput
}

export default async function updateUser({ where, data }: UpdateUserInput) {
  //TODO ctx.session.authorize()
  const session = await getSession()

  if (session?.user?.id !== data?.id) {
    throw new Error("Non autorisé")
  }

  const user = await db.user.update({ where, data })

  return user
}
