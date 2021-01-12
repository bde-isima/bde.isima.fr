import cuid from "cuid"
import { Ctx } from "blitz"

import db from "db"
import { mail } from "app/mailers"
import {
  LoginWithCallbackInput,
  LoginWithCallbackInputType,
} from "app/components/forms/validations"

export default async function login(input: LoginWithCallbackInputType, ctx: Ctx) {
  const { identifier, callbackUrl } = LoginWithCallbackInput.parse(input)

  const card = parseInt(identifier)
  const key = Number.isNaN(card) ? "email" : "card"
  const value = key === "card" ? card : identifier

  const user = await db.user.findUnique({ where: { [key]: value } })

  if (user) {
    const token = cuid()
    const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000)

    try {
      await db.loginRequest.create({
        data: { userId: user.id, token, callbackUrl, expires: inFifteenMinutes },
      })

      mail.send({
        subject: "Connexion à bde.isima.fr",
        to: user.email,
        view: "login/template.min.html",
        variables: {
          firstname: user.firstname,
          link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`,
        },
      })
    } catch (err) {
      console.log(err)
    }
  }

  return "Vérifiez votre boîte mail. Un lien de connexion vous a été envoyé."
}
