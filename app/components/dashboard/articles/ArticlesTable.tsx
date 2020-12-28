import Avatar from "@material-ui/core/Avatar"
import Checkbox from "@material-ui/core/Checkbox"

import Table from "../data/Table"
import ArticleForm from "./ArticleForm"
import getArticles from "app/entities/articles/queries/getArticles"
import upsertArticle from "app/entities/articles/mutations/upsertArticle"
import deleteManyArticles from "app/entities/articles/mutations/deleteManyArticles"

const columns = [
  {
    id: "image",
    headerName: "Logo",
    render: (row) => <Avatar src={row.image} alt={`Logo du ${row.name}`} />,
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

export default function ArticlesTable() {
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
