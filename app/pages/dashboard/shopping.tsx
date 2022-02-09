import { BlitzPage, Image, Routes } from "blitz";
import Table                        from "../../components/dashboard/data/Table";
import upsertArticle                from "../../entities/articles/mutations/upsertArticle";
import deleteManyArticles           from "../../entities/articles/mutations/deleteManyArticles";
import ArticleForm                  from "../../components/dashboard/articles/ArticleForm";
import { redirectAuthenticatedTo }  from "../../components/nav/dashboard/bde-config";
import getDashboardNav              from "../../components/nav/dashboard/getDashboardNav";
import getCriticalArticles          from "../../entities/articles/queries/getCriticalArticles";

const Shopping: BlitzPage = () => {
  return (
    <Table
      title="Courses"
      columns={columns}
      queryKey="articles"
      getQuery={getCriticalArticles}
      upsertQuery={upsertArticle}
      deleteQuery={deleteManyArticles}
      FormComponent={ArticleForm}
    />
  )
}

Shopping.suppressFirstRenderFlicker = true
Shopping.authenticate               = { redirectTo: Routes.Login() }
Shopping.redirectAuthenticatedTo    = redirectAuthenticatedTo(Routes.Articles())
Shopping.getLayout                  = (page) => getDashboardNav(page, 'Courses à faire')

const columns = [
  {
    id        : 'image',
    headerName: 'Logo',
    render    : (row) =>
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
    id            : 'name',
    headerName    : 'Name',
    searchCriteria: 'contains',
  },
]

export default Shopping
