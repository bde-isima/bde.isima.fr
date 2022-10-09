import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import Table from 'app/components/dashboard/data/Table';
import PartnerForm from 'app/components/dashboard/partners/PartnerForm';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyPartners from 'app/entities/partners/mutations/deleteManyPartners';
import upsertPartner from 'app/entities/partners/mutations/upsertPartner';
import getPartners from 'app/entities/partners/queries/getPartners';

const Partners: BlitzPage = () => {
  return (
    <Table
      title="Partenaires"
      columns={columns}
      queryKey="partners"
      getQuery={getPartners}
      upsertQuery={upsertPartner}
      deleteQuery={deleteManyPartners}
      FormComponent={PartnerForm}
    />
  );
};

Partners.suppressFirstRenderFlicker = true;
Partners.authenticate = { redirectTo: Routes.Login() };
Partners.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Partners());
Partners.getLayout = (page) => getDashboardNav(page, 'Gestion des partenaires');

const columns = [
  {
    id: 'image',
    headerName: 'Photo',
    render: (row) =>
      row.image && (
        <Image className="ml-auto rounded-full" src={row.image} width={40} height={40} alt={`Photo de ${row.name}`} />
      )
  },
  {
    id: 'name',
    headerName: 'Nom',
    searchCriteria: 'contains'
  },
  {
    id: 'description',
    headerName: 'Description',
    searchCriteria: 'contains'
  }
];

export default Partners;
