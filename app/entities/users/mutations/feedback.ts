import { mail } from "app/mailers"

type FeedbackInput = {
  subject: string
  message: string
  from: string
}

export default async function feedback({ subject, message, from }: FeedbackInput) {
  //TODO ctx.session.authorize()

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
  } catch (err) {
    console.log(err)
  }
}
