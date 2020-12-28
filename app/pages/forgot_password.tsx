import { BlitzPage } from "blitz"

import Layout from "app/layouts/Layout"
import ForgotPassword from "app/components/public/forgot_password/ForgotPassword"

const ForgotPasswordIndex: BlitzPage = () => {
  return (
    <ForgotPassword />
  )
}

ForgotPasswordIndex.getLayout = (page) => <Layout title="Oubli de mot de passe">{page}</Layout>

export default ForgotPasswordIndex
