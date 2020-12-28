import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import ClubsTable from "app/components/dashboard/clubs/ClubsTable"

const Clubs: BlitzPage = () => {
  return (
    <ClubsTable />
  )
}

Clubs.getLayout = (page) => <Layout title="Gestion des clubs">{page}</Layout>

export default Clubs
