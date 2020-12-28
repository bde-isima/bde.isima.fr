import { useQuery } from "blitz"
import { createContext, useContext } from "react"
import { useCurrentUser } from "app/hooks/useCurrentUser"

import { EventSubscriptionWithTypedCart } from "types"
import getEventSubscription from "app/entities/eventSubscriptions/queries/getEventSubscription"

interface EventSubscriptionContextType {
  isFetching: Boolean
  eventSubscription: EventSubscriptionWithTypedCart
  setQueryData: (newData) => void
}

const EventSubscriptionContext = createContext<EventSubscriptionContextType>({} as any)

export const useEventSubscription = () => {
  return useContext(EventSubscriptionContext)
}

export function EventSubscriptionProvider({ eventId, children }) {
  const [user] = useCurrentUser()

  const [eventSubscription, { isFetching, setQueryData }] = useQuery(
    getEventSubscription,
    {
      where: {
        eventId,
        userId: user?.id,
      },
    },
    {
      enabled: Boolean(eventId) && Boolean(user),
      refetchOnWindowFocus: false,
    }
  )

  const setSubData = (newData) => setQueryData(newData, { refetch: false })

  return (
    <EventSubscriptionContext.Provider
      value={{
        isFetching,
        eventSubscription: eventSubscription as any,
        setQueryData: setSubData,
      }}
    >
      {children}
    </EventSubscriptionContext.Provider>
  )
}
