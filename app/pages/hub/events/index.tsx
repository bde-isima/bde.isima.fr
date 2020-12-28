import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import Events from "app/components/hub/events/Events"

const EventsIndex: BlitzPage = () => {
  return (
    <Events />
  )
}

EventsIndex.getLayout = (page) => <Layout title="Events ZZ">{page}</Layout>

export default EventsIndex
