import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import ClubForm from 'app/components/dashboard/clubs/ClubForm';
import Table from 'app/components/dashboard/data/Table';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyClubs from 'app/entities/clubs/mutations/deleteManyClubs';
import upsertClub from 'app/entities/clubs/mutations/upsertClub';
import getClubs from 'app/entities/clubs/queries/getClubs';

const Clubs: BlitzPage = () => {
  return (
    <Table
      title="Clubs"
      columns={columns}
      queryKey="clubs"
      getQuery={getClubs}
      upsertQuery={upsertClub}
      deleteQuery={deleteManyClubs}
      FormComponent={ClubForm}
    />
  );
};

Clubs.suppressFirstRenderFlicker = true;
Clubs.authenticate = { redirectTo: Routes.Login() };
Clubs.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Clubs());
Clubs.getLayout = (page) => getDashboardNav(page, 'Gestion des clubs');

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
    headerName: 'Name',
    searchCriteria: 'contains',
    format: (value) => (value ? value.toLowerCase() : value)
  },
  {
    id: 'email',
    headerName: 'Email',
    searchCriteria: 'contains'
  }
];

export default Clubs;
