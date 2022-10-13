import { BlitzPage, Routes } from '@blitzjs/next';

import Table from 'app/components/dashboard/data/Table';
import PromotionForm from 'app/components/dashboard/promotions/PromotionForm';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyPromotions from 'app/entities/promotions/mutations/deleteManyPromotions';
import upsertPromotion from 'app/entities/promotions/mutations/upsertPromotion';
import getPromotions from 'app/entities/promotions/queries/getPromotions';

const Promotions: BlitzPage = () => {
  return (
    <Table
      title="Promotions"
      columns={columns}
      queryKey="promotions"
      getQuery={getPromotions}
      upsertQuery={upsertPromotion}
      deleteQuery={deleteManyPromotions}
      FormComponent={PromotionForm}
    />
  );
};

Promotions.suppressFirstRenderFlicker = true;
Promotions.authenticate = { redirectTo: Routes.Login() };
Promotions.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Promotions());
Promotions.getLayout = (page) => getDashboardNav(page, 'Gestion des promotions');

const columns = [
  {
    id: 'year',
    headerName: 'Année',
    searchCriteria: 'equals'
  },
  {
    id: 'fb_group_id',
    headerName: 'ID groupe Facebook'
  },
  {
    id: 'list_email',
    headerName: 'Liste de diffusion'
  }
];

export default Promotions;
