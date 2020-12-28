import { Ctx } from "blitz"

import db from "db"
import { hashPassword } from "app/auth/auth-utils"

type InitPasswordInput = { 
  password: string
  confirmPassword: string
  token: string
}

export default async function initPassword({ password, confirmPassword, token }: InitPasswordInput, ctx: Ctx) {
  if (!password || !confirmPassword) {
    throw new Error("Mots de passe non fournis")
  }

  if (password !== confirmPassword) {
    throw new Error("Mots de passe non identiques")
  }

  const newPassword = await hashPassword(password)

  const user = await db.user.findUnique({ where: { resetPasswordToken: token } })

  if(!user) {
    throw new Error("Token invalide")
  }

  const newUser = await db.user.update({ 
    where: { id: user.id },
    data: { password: newPassword, resetPasswordToken: null } 
  })

  await ctx.session.create({ userId: newUser.id, roles: newUser.roles })

  return newUser
}
