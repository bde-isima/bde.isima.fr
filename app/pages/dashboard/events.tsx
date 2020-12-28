import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import EventsTable from "app/components/dashboard/events/EventsTable"

const Events: BlitzPage = () => {
  return (
    <EventsTable />
  )
}

Events.getLayout = (page) => <Layout title="Gestion des événements">{page}</Layout>

export default Events