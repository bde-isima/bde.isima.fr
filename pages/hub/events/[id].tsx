import Head from "next/head"
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
      <Head>
        <title>{event.name}</title>
        <meta name="title" content={event.name} key="title" />
        <meta name="description" content={event.description} key="description" />

        <meta
          name="twitter:url"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${event.id}`}
          key="twitter:url"
        />
        <meta name="twitter:title" content={event.name} key="twitter:title" />
        <meta name="twitter:description" content={event.description} key="twitter:description" />
        <meta
          name="twitter:image"
          content={
            event.club.image ||
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-192x192.png`
          }
          key="twitter:image"
        />
        <meta
          name="twitter:creator"
          content={event.club.twitterURL?.split("/")[3] ?? "@bde_isima"}
          key="twitter:creator"
        />

        <meta property="fb:app_id" content="237417597136510" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:title" content={event.name} key="og:title" />
        <meta property="og:description" content={event.description} key="og:description" />
        <meta property="og:site_name" content={globalThis.appName} key="og:site_name" />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/events/${event.id}`}
          key="og:url"
        />
        <meta
          property="og:image"
          content={
            event.club.image ||
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/static/images/favicons/android-chrome-512x512.png`
          }
          key="og:image"
        />
      </Head>

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

  return {
    props: { event: convertDatesToStrings(event) },
  }
}
