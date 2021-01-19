import Divider from "@material-ui/core/Divider"

import db, { Event, Club } from "db"
import Header from "app/components/hub/events/Header"
import Cart from "app/components/hub/events/cart/Cart"
import ProductsList from "app/components/hub/events/product/ProductsList"
import { convertDatesToStrings, convertStringsToDate } from "app/utils/convertDatesToStrings"
import { EventSubscriptionProvider } from "app/components/hub/events/subscription/EventSubscription"

type EventProps = {
  event: Event & { club: Club }
}

export default function EventIndex({ event }: EventProps) {
  const evt = convertStringsToDate(event)

  return (
    <div
      className="flex flex-col-reverse md:grid md:gap-16 mb-20"
      style={{ gridTemplateColumns: "1fr 310px" }}
    >
      <EventSubscriptionProvider eventId={evt?.id}>
        <main className="flex flex-col">
          <Header event={evt} />
          <Divider className="m-4" />
          <ProductsList event={evt} />
        </main>

        <aside>
          <Cart event={evt} />
        </aside>
      </EventSubscriptionProvider>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const event = await db.event.findUnique({
    where: { id: params?.id as string },
    include: { club: true },
  })

  if (!event) {
    return {
      notFound: true,
    }
  }

  if (new Date() > event.subscriptions_end_at) {
    return {
      redirect: {
        permanent: false,
        destination: "/hub/events",
      },
    }
  }

  return {
    props: {
      injectKey: "events/id",
      event: convertDatesToStrings(event),
    },
  }
}
