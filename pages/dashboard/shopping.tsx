import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import ArticleForm from 'app/components/dashboard/articles/ArticleForm';
import Table from 'app/components/dashboard/data/Table';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyArticles from 'app/entities/articles/mutations/deleteManyArticles';
import upsertArticle from 'app/entities/articles/mutations/upsertArticle';
import getCriticalArticles from 'app/entities/articles/queries/getCriticalArticles';

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
  );
};

Shopping.suppressFirstRenderFlicker = true;
Shopping.authenticate = { redirectTo: Routes.Login() };
Shopping.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Articles());
Shopping.getLayout = (page) => getDashboardNav(page, 'Courses à faire');

const columns = [
  {
    id: 'image',
    headerName: 'Logo',
    render: (row) =>
      row.image && (
        <Image className="ml-auto rounded-full" src={row.image} width={40} height={40} alt={`Photo de ${row.name}`} />
      )
  },
  {
    id: 'name',
    headerName: 'Nom du produit',
    searchCriteria: 'contains'
  },
  {
    id: 'quantity',
    headerName: 'Quantité restante'
  },
  {
    id: 'price',
    headerName: 'Prix'
  }
];

export default Shopping;
