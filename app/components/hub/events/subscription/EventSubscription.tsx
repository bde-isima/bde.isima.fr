import { useQuery } from "blitz"
import { useRouter } from "next/router"
import { createContext, useContext } from "react"

import { Club } from "db"
import getEvent from "app/entities/events/queries/getEvent"
import { useBDESession } from "app/components/auth/SessionProvider"
import { EventSubscriptionWithTypedCart, EventWithTypedProducts } from "types"

interface EventSubscriptionContextType {
  event: EventWithTypedProducts & { club: Club }
  eventSubscription: EventSubscriptionWithTypedCart
  setQueryData: any
}

const EventSubscriptionContext = createContext<EventSubscriptionContextType>({} as any)

export const useEventSubscription = () => {
  return useContext(EventSubscriptionContext)
}

export function EventSubscriptionProvider({ children }) {
  const session = useBDESession()
  const eventId = useRouter().query.id

  const [{ EventSubscription, ...data }, { setQueryData }] = useQuery(
    getEvent,
    {
      where: { id: eventId as string },
      include: { club: true, EventSubscription: { where: { userId: session?.userId } } },
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  return (
    <EventSubscriptionContext.Provider
      value={{
        event: data as any,
        eventSubscription: EventSubscription[0],
        setQueryData,
      }}
    >
      {children}
    </EventSubscriptionContext.Provider>
  )
}
