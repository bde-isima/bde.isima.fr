import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import ArticlesTable from "app/components/dashboard/articles/ArticlesTable"

const Articles: BlitzPage = () => {
  return (
    <ArticlesTable />
  )
}

Articles.getLayout = (page) => <Layout title="Gestion des articles">{page}</Layout>

export default Articles
