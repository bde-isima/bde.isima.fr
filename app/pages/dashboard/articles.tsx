import Checkbox from '@mui/material/Checkbox'
import { Image, BlitzPage, Routes } from 'blitz'

import Table from 'app/components/dashboard/data/Table'
import getArticles from 'app/entities/articles/queries/getArticles'
import ArticleForm from 'app/components/dashboard/articles/ArticleForm'
import upsertArticle from 'app/entities/articles/mutations/upsertArticle'
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav'
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config'
import deleteManyArticles from 'app/entities/articles/mutations/deleteManyArticles'

const Articles: BlitzPage = () => {
  return (
    <Table
      title="Marché"
      columns={columns}
      queryKey="articles"
      getQuery={getArticles}
      upsertQuery={upsertArticle}
      deleteQuery={deleteManyArticles}
      FormComponent={ArticleForm}
    />
  )
}

Articles.suppressFirstRenderFlicker = true
Articles.authenticate = { redirectTo: Routes.Login() }
Articles.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Articles())
Articles.getLayout = (page) => getDashboardNav(page, 'Gestion des articles')

const columns = [
  {
    id: 'image',
    headerName: 'Logo',
    render: (row) =>
      row.image && (
        <Image
          className="ml-auto rounded-full"
          src={row.image}
          width={40}
          height={40}
          alt={`Photo de ${row.name}`}
        />
      ),
  },
  {
    id: 'name',
    headerName: 'Name',
    searchCriteria: 'contains',
  },
  {
    id: 'quantity',
    headerName: 'Quantité',
    format: (value) => parseInt(value),
  },
  {
    id: 'price',
    headerName: 'Prix',
    format: (value) => parseFloat(value),
  },
  {
    id: 'member_price',
    headerName: 'Prix membre',
    format: (value) => parseFloat(value),
  },
  {
    id: 'is_enabled',
    headerName: 'Activé',
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />,
  },
]

export default Articles
