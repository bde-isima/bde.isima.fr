import EventTags from "app/components/common/tags/EventTags"

export default function InjectTags(pageProps: any) {
  const injectKey = pageProps.injectKey

  if (injectKey === "events/id") {
    return <EventTags event={pageProps.event as any} />
  }

  return null
}
