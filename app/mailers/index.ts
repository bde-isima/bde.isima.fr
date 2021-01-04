import nodemailer from "nodemailer"

import { compileView } from "./templates/views"

type MailParams = {
  subject: string
  to: string
  view: string
  variables: object
}

export const mail = {
  send: async ({ subject, to, view, variables }: MailParams) => {
    const mailTransport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    try {
      return mailTransport.sendMail({
        to,
        from: process.env.SMTP_FROM,
        subject,
        html: compileView({
          subject,
          view,
          variables,
        }),
      })
    } catch (e) {
      console.error(e?.response?.body || e)
    }
  },
}
