import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';

import Item from '@mui/icons-material/Fastfood';

import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import ArticleForm from 'app/components/dashboard/articles/ArticleForm';
import Table from 'app/components/dashboard/data/Table';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyArticles from 'app/entities/articles/mutations/deleteManyArticles';
import upsertArticle from 'app/entities/articles/mutations/upsertArticle';
import getArticles from 'app/entities/articles/queries/getArticles';

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
  );
};

Articles.suppressFirstRenderFlicker = true;
Articles.authenticate = { redirectTo: Routes.Login() };
Articles.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Articles());
Articles.getLayout = (page) => getDashboardNav(page, 'Gestion des articles');

const columns = [
  {
    id: 'image',
    headerName: 'Logo',
    render: (row) =>
      row.image ? (
        <Image className="ml-auto" src={row.image} width={40} height={40} alt={`Photo de ${row.name}`} />
      ) : (
        <Avatar className="ml-auto" alt={`Photo de ${row.name}`}>
          <Item />
        </Avatar>
      )
  },
  {
    id: 'name',
    headerName: 'Name',
    searchCriteria: 'contains'
  },
  {
    id: 'price',
    headerName: 'Prix',
    format: (value) => parseFloat(value)
  },
  {
    id: 'member_price',
    headerName: 'Prix membre',
    format: (value) => parseFloat(value)
  },
  {
    id: 'is_enabled',
    headerName: 'Activé',
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />
  }
];

export default Articles;
