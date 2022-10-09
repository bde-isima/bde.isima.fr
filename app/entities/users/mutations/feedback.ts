import { mail } from 'mail';

import { resolver } from '@blitzjs/rpc';

type FeedbackInput = {
  subject: string;
  message: string;
  from: string;
};

export default resolver.pipe(resolver.authorize(), async ({ subject, message, from }: FeedbackInput) => {
  try {
    await mail.send({
      subject: from,
      to: `bde.isima.webmaster+${subject.trim()}@gmail.com`,
      view: 'feedback',
      variables: {
        subject: from,
        message,
        from
      }
    });
  } catch (err) {
    console.log(err);
  }
});
