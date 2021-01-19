import { Event, Club } from "db"

type EventProps = {
  event: Event & { club: Club }
}

export default function EventTags({ event }: EventProps) {
  return (
    <>
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
    </>
  )
}
