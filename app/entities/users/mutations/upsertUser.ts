import cuid from "cuid"
import { Ctx } from "blitz"

import { mail } from "mail"
import db, { Prisma } from "db"
import { MAX_RAND, RandomInBetween } from "app/utils/math-utils"

type UpsertUserInput = Pick<Prisma.UserUpsertArgs, "where" | "create" | "update">

export default async function upsertUser({ where, create, update }: UpsertUserInput, ctx: Ctx) {
  ctx.session.authorize(["*", "bde"])

  const user = await db.user.findUnique({ where })

  if (!user) {
    if (!create.card) {
      create.card = await generateCardNumber()
    }

    const newUser = await db.user.create({ data: create })

    try {
      const subject = "Activation de ton compte BDE"

      const token = cuid()
      const inAWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

      await db.loginRequest.create({
        data: {
          userId: newUser.id,
          token,
          callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/hub`,
          expires: inAWeek,
        },
      })

      mail.send({
        subject,
        to: newUser.email,
        view: "activation",
        variables: {
          subject,
          firstname: newUser.firstname,
          link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`,
        },
      })
    } catch (err) {
      console.log(err)
    }

    return newUser
  } else {
    const newUser = await db.user.update({ where, data: update })

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
      newUser,
      sessions,
    }
  }
}

async function generateCardNumber() {
  const users = await db.user.findMany({ select: { card: true } })
  const cards = users.map((user) => user.card)

  let iteration: number = 0
  let card: number | null = null

  while (!card) {
    if (iteration > 2000) {
      //Prevent infinite loop
      throw new Error("Could not generate card number")
    }

    const tmp = parseInt(RandomInBetween(1, MAX_RAND).toString().substr(0, 4))

    // eslint-disable-next-line no-loop-func
    if (cards.findIndex((c) => c === card) === -1) {
      card = tmp
    }
    ++iteration
  }

  return card
}
