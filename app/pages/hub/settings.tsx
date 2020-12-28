import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import Settings from "app/components/hub/settings/Settings"

const SettingsIndex: BlitzPage = () => {
  return (
    <Settings />
  )
}

SettingsIndex.getLayout = (page) => <Layout title="Paramètres">{page}</Layout>

export default SettingsIndex
