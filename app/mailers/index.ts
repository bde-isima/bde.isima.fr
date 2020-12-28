import { log } from "@blitzjs/display"

import { smtpDriver } from "./drivers/smtp"
import { compileView } from "./templates/views"

const mailDrivers = {
  SMTP: smtpDriver,
}

if (!mailDrivers[process.env.MAIL_DRIVER as keyof typeof mailDrivers]) {
  const allowedDriversLabel = Object.keys(mailDrivers).join(", ")

  const errorMessage = `Invalid MAIL_DRIVER environment variable. Must be one of: ${allowedDriversLabel}`

  log.error(errorMessage)

  throw new Error(errorMessage)
}

const mailDriver = mailDrivers[process.env.MAIL_DRIVER as keyof typeof mailDrivers]()

export type MailDriver = () => {
  send: (options: {
    from: {
      email: string
      name: string
    }
    to: string
    subject: string
    html: string
  }) => Promise<any>
}

export const mail = {
  send: async ({
    subject,
    to,
    view,
    variables,
  }: {
    subject: string
    to: string
    view: string
    variables: object
  }) => {
    try {
      return await mailDriver.send({
        from: {
          email: process.env.MAIL_FROM_EMAIL!,
          name: process.env.MAIL_FROM_NAME!,
        },
        to,
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