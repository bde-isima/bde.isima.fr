import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

const Planning: BlitzPage = () => {
  return (
    <div />
  )
}

Planning.getLayout = (page) => <Layout title="Gestion du planning">{page}</Layout>

export default Planning
