import { Ctx } from "blitz"

import db, { Prisma } from "db"

type UpsertUserInput = Pick<Prisma.UserUpsertArgs, "where" | "create" | "update">

export default async function upsertUser({ where, create, update }: UpsertUserInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const user = await db.user.findUnique({ where })

  if (!user) {
    const newUser = await db.user.create({ data: create })

    return newUser
  } else {
    const newUser = await db.user.update({ where, data: update })

    const sessions = await db.session.updateMany({
      where: { userId: user?.id },
      data: { publicData: { set: JSON.stringify({ userId: user?.id, roles: newUser.roles }) } },
    })

    return {
      newUser,
      sessions,
    }
  }
}
