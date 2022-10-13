import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

import { assertArrayNonEmpty } from 'app/core/utils/assert';

type upsertEventSubscriptionInput = Pick<Prisma.EventSubscriptionUpsertArgs, 'where' | 'create' | 'update'>;

export default resolver.pipe(resolver.authorize(), async ({ where, create, update }: upsertEventSubscriptionInput) => {
  const event = await db.event.findUniqueOrThrow({
    where: { id: create.event?.connect?.id }
  });

  if (event.products.length > 0) {
    assertArrayNonEmpty('Le panier', create.cart);
  }

  const eventSubscriptions = await db.eventSubscription.count({
    where: {
      eventId: create.event?.connect?.id,
      userId: { not: create.user?.connect?.id }
    }
  });

  if (event.max_subscribers && event.max_subscribers <= eventSubscriptions) {
    throw new Error('Événement plein');
  }

  if (new Date() > event.subscriptions_end_at) {
    throw new Error('Inscriptions closes');
  }

  return await db.eventSubscription.upsert({ where, update, create });
});
