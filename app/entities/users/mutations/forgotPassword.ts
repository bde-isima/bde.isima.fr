import cuid from "cuid"

import db from "db"
import { mail } from "app/mailers"

type ForgotPasswordInput = { 
  email: string
}

export default async function forgotPassword({ email }: ForgotPasswordInput) {
  const user = await db.user.findUnique({ where: { email } })

  if (user) {
    const resetPasswordToken = cuid()
    await db.user.update({ 
      where: { email }, 
      data: { resetPasswordToken }, 
    })

    try {
      mail.send({
        subject: "Réinitilisation de ton mot de passe",
        to: email,
        view: "forgot_password/template.min.html",
        variables: {
          firstname: user.firstname,
          link: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/reset_password?token=${resetPasswordToken}`
        },
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}