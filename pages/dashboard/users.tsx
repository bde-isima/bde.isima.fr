import Image from "next/image";
import { BlitzPage, Routes } from "@blitzjs/next";
import Checkbox from '@mui/material/Checkbox'

import Table from 'app/components/dashboard/data/Table'
import getUsers from 'app/entities/users/queries/getUsers'
import UserForm from 'app/components/dashboard/users/UserForm'
import upsertUser from 'app/entities/users/mutations/upsertUser'
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav'
import deleteManyUsers from 'app/entities/users/mutations/deleteManyUsers'
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config'

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
  )
}

Users.suppressFirstRenderFlicker = true
Users.authenticate = { redirectTo: Routes.Login() }
Users.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Users())
Users.getLayout = (page) => getDashboardNav(page, 'Gestion des membres')

const columns = [
  {
    id: 'image',
    headerName: 'Photo',
    render: (row) =>
      row.image && (
        <Image
          className="ml-auto rounded-full"
          src={row.image}
          width={40}
          height={40}
          alt={`Photo de ${row.lastname} ${row.firstname}`}
        />
      ),
  },
  {
    id: 'lastname',
    headerName: 'Nom',
    searchCriteria: 'contains',
  },
  {
    id: 'firstname',
    headerName: 'Prénom',
    searchCriteria: 'contains',
  },
  {
    id: 'nickname',
    headerName: 'Surnom',
    searchCriteria: 'contains',
  },
  {
    id: 'email',
    headerName: 'Email',
    searchCriteria: 'contains',
  },
  {
    id: 'card',
    headerName: 'N° Carte',
  },
  {
    id: 'balance',
    headerName: 'Solde',
    render: (row) => row.balance.toFixed(2),
  },
  {
    id: 'promotion',
    exclude: true,
    headerName: 'Promotion',
    render: (row) => row.promotion?.year,
  },
  {
    id: 'roles',
    headerName: 'Roles',
    render: (row) => row.roles.join(', '),
  },
  {
    id: 'is_member',
    headerName: 'Cotisant',
    render: (row) => <Checkbox checked={row.is_member} color="default" disabled />,
  },
  {
    id: 'is_enabled',
    headerName: 'Activé',
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />,
  },
]

export default Users
