import { useQuery, useSession } from "blitz"
import { createContext, useContext } from "react"

import { EventSubscriptionWithTypedCart } from "types"
import getEventSubscription from "app/entities/eventSubscriptions/queries/getEventSubscription"

interface EventSubscriptionContextType {
  isFetching: Boolean
  eventSubscription: EventSubscriptionWithTypedCart
  setQueryData: any
}

const EventSubscriptionContext = createContext<EventSubscriptionContextType>({} as any)

export const useEventSubscription = () => {
  return useContext(EventSubscriptionContext)
}

export function EventSubscriptionProvider({ eventId, children }) {
  const session = useSession()

  const inputArgs = { where: { eventId, userId: session?.userId } }

  const [data, { isFetching, setQueryData }] = useQuery(getEventSubscription, inputArgs, {
    enabled: Boolean(eventId) && !session.isLoading,
    refetchOnWindowFocus: false,
    suspense: false,
  })

  return (
    <EventSubscriptionContext.Provider
      value={{
        isFetching: session.isLoading || isFetching,
        eventSubscription: data as any,
        setQueryData,
      }}
    >
      {children}
    </EventSubscriptionContext.Provider>
  )
}
