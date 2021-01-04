import { useQuery } from "react-query"
import { useSession } from "next-auth/client"
import { createContext, useContext } from "react"

import { EventSubscriptionWithTypedCart } from "types"
import getEventSubscription from "app/entities/eventSubscriptions/queries/getEventSubscription"

interface EventSubscriptionContextType {
  isFetching: Boolean
  eventSubscription: EventSubscriptionWithTypedCart
}

const EventSubscriptionContext = createContext<EventSubscriptionContextType>({} as any)

export const useEventSubscription = () => {
  return useContext(EventSubscriptionContext)
}

export function EventSubscriptionProvider({ eventId, children }) {
  const [session, isLoading] = useSession()

  const { data, isFetching } = useQuery(
    "getEventSubscription",
    () =>
      getEventSubscription({
        where: {
          eventId,
          userId: session?.id,
        },
      }),
    {
      enabled: Boolean(eventId) && isLoading,
      refetchOnWindowFocus: false,
      suspense: false,
    }
  )

  return (
    <EventSubscriptionContext.Provider
      value={{
        isFetching,
        eventSubscription: data as any,
      }}
    >
      {children}
    </EventSubscriptionContext.Provider>
  )
}
