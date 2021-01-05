import { NextApiRequest, NextApiResponse } from "next"

import { mail } from "app/mailers"

type FeedbackInput = {
  subject: string
  message: string
  from: string
}

export default async function feedback(req: NextApiRequest, res: NextApiResponse) {
  //TODO ctx.session.authorize()

  const { subject, message, from }: FeedbackInput = req.body

  try {
    mail.send({
      subject: from,
      to: `${process.env.MAIL_USER}+${subject.trim()}@gmail.com`,
      view: "feedback/template.min.html",
      variables: {
        message,
        from,
      },
    })

    res.status(200)
  } catch (err) {
    res.status(500).json(err)
  }
}
