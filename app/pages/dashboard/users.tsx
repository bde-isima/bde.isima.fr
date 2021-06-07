import Image from 'next/image'
import Checkbox from '@material-ui/core/Checkbox'

import PageTitle from 'app/core/layouts/PageTitle'
import Table from 'app/components/dashboard/data/Table'
import getUsers from 'app/entities/users/queries/getUsers'
import UserForm from 'app/components/dashboard/users/UserForm'
import upsertUser from 'app/entities/users/mutations/upsertUser'
import deleteManyUsers from 'app/entities/users/mutations/deleteManyUsers'

export default function Users() {
  return (
    <>
      <PageTitle title="Gestion des membres" />

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
    </>
  )
}

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
