import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import UsersTable from "app/components/dashboard/users/UsersTable"

const Users: BlitzPage = () => {
  return (
    <UsersTable />
  )
}

Users.getLayout = (page) => <Layout title="Gestion des membres">{page}</Layout>

export default Users
