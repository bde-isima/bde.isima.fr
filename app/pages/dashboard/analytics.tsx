import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import Analytics from 'app/components/dashboard/analytics/Analytics'

const AnalyticsIndex: BlitzPage = () => {
  return (
    <Analytics />
  )
}

AnalyticsIndex.getLayout = (page) => <Layout title="Statistiques">{page}</Layout>

export default AnalyticsIndex
