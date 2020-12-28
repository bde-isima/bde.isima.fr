import Avatar from "@material-ui/core/Avatar"
import Checkbox from "@material-ui/core/Checkbox"

import Table from "../data/Table"
import UserForm from "./UserForm"
import getUsers from "app/entities/users/queries/getUsers"
import upsertUser from "app/entities/users/mutations/upsertUser"
import deleteManyUsers from "app/entities/users/mutations/deleteManyUsers"

const columns = [
  {
    id: "image",
    headerName: "Photo",
    render: (row) => (
      <Avatar
        className="ml-auto"
        src={row.image}
        alt={`Photo de ${row.lastname} ${row.firstname}`}
      />
    ),
  },
  {
    id: "lastname",
    headerName: "Nom",
    searchCriteria: "contains",
  },
  {
    id: "firstname",
    headerName: "Prénom",
    searchCriteria: "contains",
  },
  {
    id: "nickname",
    headerName: "Surnom",
    searchCriteria: "contains",
  },
  {
    id: "email",
    headerName: "Email",
    searchCriteria: "contains",
  },
  {
    id: "card",
    headerName: "N° Carte",
    format: (value) => parseInt(value),
  },
  {
    id: "balance",
    headerName: "Solde",
    format: (value) => parseFloat(value),
  },
  {
    id: "promotion",
    headerName: "Promotion",
    render: (row) => row.promotion?.year,
    format: (value) => ({ connect: { id: value } }),
  },
  {
    id: "roles",
    headerName: "Rôles",
    render: (row) => row.roles.join(", "),
  },
  {
    id: "is_member",
    headerName: "Cotisant",
    render: (row) => <Checkbox checked={row.is_member} color="default" disabled />,
  },
  {
    id: "is_enabled",
    headerName: "Activé",
    render: (row) => <Checkbox checked={row.is_enabled} color="default" disabled />,
  },
]

export default function UsersTable() {
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
