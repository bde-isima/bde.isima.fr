import cuid from "cuid"

import db, { Prisma } from "db"
import { mail } from "app/mailers"
import { assertIsNumber } from "app/utils/assert"

type UpsertUserInput = Pick<Prisma.UserUpsertArgs, "where" | "create" | "update">

export default async function upsertUser({ where, create, update }: UpsertUserInput) {
  //TODO ctx.session.authorize(['*', 'bde'])

  assertIsNumber("card", create.card)
  assertIsNumber("card", update.card)

  const user = await db.user.findUnique({ where })

  /*if (!user) {
    create.password = await hashPassword(Math.random().toString(36).slice(-8))
    create.resetPasswordToken = cuid()

    const newUser = await db.user.create({ data: create })

    try {
      mail.send({
        subject: "Activation de ton compte BDE",
        to: create.email,
        view: "init_password/template.min.html",
        variables: {
          firstname: create.firstname,
          link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/init_password?token=${create.resetPasswordToken}`
        },
      })
    }
    catch(err) {
      console.log(err)
    }

    return newUser
  }
  else {
    const newUser = await db.user.update({ where, data: update })

    const sessions = await db.session.updateMany({
      where: { userId: user?.id },
      data: { publicData: { set: JSON.stringify({ userId: user?.id, roles: newUser.roles }) } }
    })

    return {
      newUser,
      sessions,
    }
  }*/
}
