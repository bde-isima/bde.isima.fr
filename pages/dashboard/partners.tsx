import { Checkbox } from '@mui/material';
import Avatar from '@mui/material/Avatar';

import AccountBalance from '@mui/icons-material/AccountBalance';

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
      row.image ? (
        <Image className="ml-auto" src={row.image} width={40} height={40} alt={`Photo de ${row.name}`} />
      ) : (
        <Avatar className="ml-auto" alt={`Photo de ${row.name}`}>
          <AccountBalance />
        </Avatar>
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
  },
  {
    id: 'is_enabled',
    headerName: 'Partenariat public',
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />
  }
];

export default Partners;
