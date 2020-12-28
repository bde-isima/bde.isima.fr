import { BlitzPage } from "blitz"

import Layout from "app/layouts/Layout"
import InitPassword from "app/components/public/init_or_reset_password/InitPassword"

const InitPasswordIndex: BlitzPage = () => {
  return (
    <InitPassword />
  )
}

InitPasswordIndex.getLayout = (page) => <Layout title="Initialisation du mot de passe">{page}</Layout>

export default InitPasswordIndex
