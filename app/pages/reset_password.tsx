import { BlitzPage } from "blitz"

import Layout from "app/layouts/Layout"
import ResetPassword from "app/components/public/init_or_reset_password/ResetPassword"

const ResetPasswordIndex: BlitzPage = () => {
  return (
    <ResetPassword />
  )
}

ResetPasswordIndex.getLayout = (page) => <Layout title="Changement de mot de passe">{page}</Layout>

export default ResetPasswordIndex
