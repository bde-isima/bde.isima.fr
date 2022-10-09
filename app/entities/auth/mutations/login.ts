import { resolver } from "@blitzjs/rpc";
import cuid from 'cuid'

import db from 'db'
import { mail } from 'mail'
import {
  LoginWithCallbackInput,
  LoginWithCallbackInputType
} from 'app/components/forms/validations'

export default resolver.pipe(
  resolver.zod(LoginWithCallbackInput),
  async ({ identifier, callbackUrl }: LoginWithCallbackInputType) => {
    const card = parseInt(identifier)
    const key = Number.isNaN(card) ? 'email' : 'card'
    const value = key === 'card' ? card : identifier

    const user = await db.user.findUnique({ where: { [key]: value } })

    if (user) {
      const token = cuid()
      const subject = `Connexion à ${process.env.NEXT_PUBLIC_FRONTEND_URL}`
      const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000)

      try {
        await Promise.all([
          db.loginRequest.create({
            data: { userId: user.id, token, callbackUrl, expires: inFifteenMinutes }
          }),
          mail.send({
            subject,
            to: user.email,
            view: 'login',
            variables: {
              subject,
              firstname: user.firstname,
              link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/verify-login?token=${token}`
            }
          })
        ])
      } catch (err) {
        console.log(err)
        return err.message
      }
    }

    return 'Vérifiez votre boîte mail. Un lien de connexion vous a été envoyé.'
  }
)
