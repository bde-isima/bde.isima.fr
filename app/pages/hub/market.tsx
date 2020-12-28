import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import Market from "app/components/hub/market/Market"

const MarketIndex: BlitzPage = () => {
  return (
    <Market />
  )
}

MarketIndex.getLayout = (page) => <Layout title="Market ZZ">{page}</Layout>

export default MarketIndex
