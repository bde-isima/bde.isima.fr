import { mail } from 'mail';

import { resolver } from '@blitzjs/rpc';

type ContactInput = {
  message: string;
  subject: string;
  email: string;
};

export default resolver.pipe(async ({ subject, message, email }: ContactInput) => {
  try {
    await mail.send({
      subject,
      to: `${process.env.CONTACT_MAIL}`,
      view: 'contact',
      variables: {
        subject,
        message,
        email
      }
    });
  } catch (err) {
    console.log(err);
  }
});
