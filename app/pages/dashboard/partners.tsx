import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import PartnersTable from "app/components/dashboard/partners/PartnersTable"

const Partners: BlitzPage = () => {
  return (
    <PartnersTable />
  )
}

Partners.getLayout = (page) => <Layout title="Gestion des partenaires">{page}</Layout>

export default Partners
