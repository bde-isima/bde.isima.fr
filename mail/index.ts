import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { compileView } from './views';

type MailParams = {
  subject: string;
  to: string;
  view: string;
  variables: object;
};

export const mail = {
  send: async ({ subject, to, view, variables }: MailParams) => {
    const mailConfig: SMTPTransport.Options = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    };

    const mailTransport = nodemailer.createTransport(mailConfig);

    try {
      return mailTransport.sendMail({
        to,
        from: process.env.SMTP_EMAIL,
        subject,
        html: compileView({
          subject,
          view,
          variables
        })
      });
    } catch (e) {
      console.error(e?.response?.body || e);
    }
  }
};
