import { resolver } from 'blitz'

import { mail } from 'mail'

type ContactInput = {
  message: string
  subject: string
  email: string
}

export default resolver.pipe(async ({ subject, message, email }: ContactInput) => {
  try {
    await mail.send({
      subject,
      to: `${process.env.SMTP_USER}@gmail.com`,
      view: 'contact',
      variables: {
        subject,
        message,
        email,
      },
    })
  } catch (err) {
    console.log(err)
  }
})
