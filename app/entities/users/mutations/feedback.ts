import { Ctx } from "blitz"

import { mail } from "mail"

type FeedbackInput = {
  subject: string
  message: string
  from: string
}

export default async function feedback({ subject, message, from }: FeedbackInput, ctx: Ctx) {
  ctx.session.authorize()

  try {
    await mail.send({
      subject: from,
      to: `${process.env.SMTP_USER}+${subject.trim()}@gmail.com`,
      view: "feedback",
      variables: {
        subject: from,
        message,
        from,
      },
    })
  } catch (err) {
    console.log(err)
  }
}
