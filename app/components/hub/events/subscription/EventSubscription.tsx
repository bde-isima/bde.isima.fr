import { createContext, useContext } from 'react';

import { Club } from 'db';
import type { EventSubscriptionWithTypedCart, EventWithTypedProducts } from 'global';

import { useAuthenticatedSession } from '@blitzjs/auth';
import { useQuery } from '@blitzjs/rpc';

import { useRouter } from 'app/core/lib/router';
import getEvent from 'app/entities/events/queries/getEvent';

interface EventSubscriptionContextType {
  event: EventWithTypedProducts & { club: Club };
  eventSubscription: EventSubscriptionWithTypedCart;
  setQueryData: any;
}

const EventSubscriptionContext = createContext<EventSubscriptionContextType>({} as any);

export const useEventSubscription = () => {
  return useContext(EventSubscriptionContext);
};

export function EventSubscriptionProvider({ children }) {
  const { router } = useRouter();
  const session = useAuthenticatedSession();
  const eventId = router.query.id;

  const [{ EventSubscription, ...data }, { setQueryData }] = useQuery(
    getEvent,
    {
      where: { id: eventId as string },
      include: { club: true, EventSubscription: { where: { userId: session?.userId } } }
    },
    {
      refetchOnWindowFocus: false
    }
  );

  return (
    <EventSubscriptionContext.Provider
      value={{
        event: data as any,
        eventSubscription: EventSubscription[0],
        setQueryData
      }}
    >
      {children}
    </EventSubscriptionContext.Provider>
  );
}
