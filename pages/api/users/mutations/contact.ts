import { NextApiRequest, NextApiResponse } from "next"

import { mail } from "app/mailers"

type ContactInput = {
  message: string
  subject: string
  email: string
}

export default async function contact(req: NextApiRequest, res: NextApiResponse) {
  const { subject, message, email }: ContactInput = req.body

  try {
    mail.send({
      subject,
      to: `${process.env.MAIL_USER}@gmail.com`,
      view: "contact/template.min.html",
      variables: {
        subject,
        message,
        email,
      },
    })

    res.status(200)
  } catch (err) {
    res.status(500).json(err)
  }
}
