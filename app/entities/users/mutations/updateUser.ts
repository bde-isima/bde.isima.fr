import { Ctx, resolver } from "blitz"

import db, { Prisma } from "db"

type UpdateUserInput = {
  data: Pick<Prisma.UserUpdateInput, "id" | "nickname" | "email" | "image">
  where: Prisma.UserWhereUniqueInput
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, data }: UpdateUserInput, { session }: Ctx) => {
    if (session.userId !== where?.id) {
      throw new Error("Non autorisé")
    }

    const user = await db.user.update({ where, data })

    const sessions = await db.session.updateMany({
      where: { userId: user.id },
      data: {
        publicData: {
          set: JSON.stringify({
            userId: user.id,
            roles: user.roles,
            firstname: user.firstname,
            lastname: user.lastname,
            nickname: user.nickname,
            image: user.image,
            email: user.email,
            card: user.card,
          }),
        },
      },
    })

    return {
      user,
      sessions,
    }
  }
)
