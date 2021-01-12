import Image from "next/image"
import Checkbox from "@material-ui/core/Checkbox"

import PageTitle from "app/layouts/PageTitle"
import Table from "app/components/dashboard/data/Table"
import getArticles from "app/entities/articles/queries/getArticles"
import ArticleForm from "app/components/dashboard/articles/ArticleForm"
import upsertArticle from "app/entities/articles/mutations/upsertArticle"
import deleteManyArticles from "app/entities/articles/mutations/deleteManyArticles"

export default function Articles() {
  return (
    <>
      <PageTitle title="Gestion des articles" />

      <Table
        title="Marché"
        columns={columns}
        queryKey="articles"
        getQuery={getArticles}
        upsertQuery={upsertArticle}
        deleteQuery={deleteManyArticles}
        FormComponent={ArticleForm}
      />
    </>
  )
}

const columns = [
  {
    id: "image",
    headerName: "Logo",
    render: (row) => (
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
    id: "name",
    headerName: "Name",
    searchCriteria: "contains",
  },
  {
    id: "price",
    headerName: "Prix",
    format: (value) => parseFloat(value),
  },
  {
    id: "member_price",
    headerName: "Prix membre",
    format: (value) => parseFloat(value),
  },
  {
    id: "is_enabled",
    headerName: "Activé",
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />,
  },
]
