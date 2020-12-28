import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

const Analytics: BlitzPage = () => {
  return (
    <div />
  )
}

Analytics.getLayout = (page) => <Layout title="Aperçu des stats">{page}</Layout>

export default Analytics
