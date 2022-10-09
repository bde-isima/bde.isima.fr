import db, { PaymentMethod, Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type FindUniqueEventInput = Pick<Prisma.EventFindUniqueArgs, 'where' | 'include'>;

export default resolver.pipe(resolver.authorize(), async ({ where, include }: FindUniqueEventInput) => {
  const event: any = await db.event.findFirstOrThrow({ where, include });

  const includeSub = include?.EventSubscription as Prisma.EventSubscriptionFindManyArgs;

  if (includeSub?.where?.userId && event.EventSubscription.length === 0) {
    event.EventSubscription[0] = {
      eventId: where?.id,
      userId: includeSub?.where?.userId,
      payment_method: PaymentMethod.BDE,
      cart: []
    };
  }

  return event;
});
