import { format } from 'date-fns';

import Checkbox from '@mui/material/Checkbox';

import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import Table from 'app/components/dashboard/data/Table';
import UserForm from 'app/components/dashboard/users/UserForm';
import { Address } from 'app/components/forms/validations';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import deleteManyUsers from 'app/entities/users/mutations/deleteManyUsers';
import upsertUser from 'app/entities/users/mutations/upsertUser';
import getUsers from 'app/entities/users/queries/getUsers';

function calculateElapsedYears(from: Date) {
  const elapsed = Date.now() - from.getTime();
  const MILIS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.25;

  return Math.floor(elapsed / MILIS_PER_YEAR);
}

const Users: BlitzPage = () => {
  return (
    <Table
      title="Membres"
      columns={columns}
      queryKey="users"
      getQuery={getUsers}
      queryArgs={{ include: { promotion: true } }}
      upsertQuery={upsertUser}
      deleteQuery={deleteManyUsers}
      FormComponent={UserForm}
    />
  );
};

Users.suppressFirstRenderFlicker = true;
Users.authenticate = { redirectTo: Routes.Login() };
Users.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Users());
Users.getLayout = (page) => getDashboardNav(page, 'Gestion des membres');

const columns = [
  {
    id: 'image',
    headerName: 'Photo',
    render: (row) =>
      row.image && (
        <Image
          className="ml-auto"
          src={row.image}
          width={40}
          height={40}
          alt={`Photo de ${row.lastname} ${row.firstname}`}
        />
      )
  },
  {
    id: 'lastname',
    headerName: 'Nom',
    searchCriteria: 'contains'
  },
  {
    id: 'firstname',
    headerName: 'Prénom',
    searchCriteria: 'contains'
  },
  {
    id: 'nickname',
    headerName: 'Surnom',
    searchCriteria: 'contains'
  },
  {
    id: 'birthdate',
    headerName: 'Date de naissance',
    render: (row) => (row.birthdate)? `${format(row.birthdate, 'dd/MM/yyyy')} (${calculateElapsedYears(row.birthdate)} ans)` : ''
  },
  {
    id: 'email',
    headerName: 'Email',
    searchCriteria: 'contains'
  },
  {
    id: 'address',
    headerName: 'Adresse postale',
    render: (row) => {
      if (row.address) {
        try {
          const address = Address.parse(row.address);
          if (address) return `${address.name} ${address.zipCode} ${address.city}`;
          else return '';
        } catch {
          return 'Erreurs: données incohérentes';
        }
      } else return '';
    }
  },
  {
    id: 'card',
    headerName: 'N° Carte'
  },
  {
    id: 'balance',
    headerName: 'Solde',
    render: (row) => row.balance.toFixed(2)
  },
  {
    id: 'promotion',
    exclude: true,
    headerName: 'Promotion',
    render: (row) => row.promotion?.year
  },
  {
    id: 'roles',
    headerName: 'Roles',
    render: (row) => row.roles.join(', ')
  },
  {
    id: 'is_member',
    headerName: 'Cotisant',
    render: (row) => <Checkbox checked={row.is_member} color="default" disabled />
  },
  {
    id: 'is_enabled',
    headerName: 'Activé',
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />
  }
];

export default Users;
