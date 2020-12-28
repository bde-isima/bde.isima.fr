import { mail } from "app/mailers"

type ContactInput = { 
  message: string
  subject: string
  email: string
}

export default async function contact({ subject, message, email }: ContactInput) {
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
    }
    catch(err) {
      console.log(err)
    }
}
