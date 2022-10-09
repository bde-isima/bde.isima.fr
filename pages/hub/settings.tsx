import { useAuthenticatedSession } from '@blitzjs/auth'
import { useMutation, invalidateQuery } from '@blitzjs/rpc'
import { BlitzPage, Routes } from '@blitzjs/next'
import { Suspense } from 'react'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

import Snackbar from 'app/core/layouts/Snackbar'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import getHubNav from 'app/components/nav/hub/getHubNav'
import updateUser from 'app/entities/users/mutations/updateUser'
import SettingsForm from 'app/components/hub/settings/SettingsForm'
import { SettingsInputType } from 'app/components/forms/validations'
import getCurrentUser from 'app/entities/users/queries/getCurrentUser'

const Settings: BlitzPage = () => {
  const session = useAuthenticatedSession()

  const [updtUser] = useMutation(updateUser)

  const { open, message, severity, onShow, onClose } = useSnackbar()

  const onSuccess = async (data: SettingsInputType) => {
    try {
      await updtUser({
        data,
        where: { id: session?.userId }
      })
      onShow('success', 'Sauvegardé')
      await invalidateQuery(getCurrentUser)
    } catch (err) {
      onShow('error', err.message)
    }
  }

  return (
    <div className="p-4">
      <Typography variant="h4" color="textPrimary" paragraph>
        Paramètres
      </Typography>

      <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
        <SettingsForm onSuccess={onSuccess} />
      </Suspense>

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </div>
  )
}

Settings.suppressFirstRenderFlicker = true
Settings.authenticate = { redirectTo: Routes.Login() }
Settings.getLayout = (page) => getHubNav(page, 'Paramètres')

export default Settings
