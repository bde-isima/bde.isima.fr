import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import PromotionsTable from "app/components/dashboard/promotions/PromotionsTable"

const Promotions: BlitzPage = () => {
  return (
    <PromotionsTable />
  )
}

Promotions.getLayout = (page) => <Layout title="Gestion des promotions">{page}</Layout>

export default Promotions
