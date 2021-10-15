import { Suspense } from 'react'
import Paper from '@mui/material/Paper'
import { BlitzPage, Routes } from 'blitz'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import { useMutation, invalidateQuery, useAuthenticatedSession } from 'blitz'

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

  const onSuccess = (data: SettingsInputType) => {
    return updtUser({
      data,
      where: { id: session?.userId },
    })
      .then(() => {
        onShow('success', 'Sauvegardé')
        invalidateQuery(getCurrentUser)
      })
      .catch((err) => onShow('error', err.message))
  }

  return (
    <Paper className="p-4">
      <Typography variant="h4" color="textPrimary" paragraph>
        Paramètres
      </Typography>

      <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
        <SettingsForm onSuccess={onSuccess} />
      </Suspense>

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </Paper>
  )
}

Settings.suppressFirstRenderFlicker = true
Settings.authenticate = { redirectTo: Routes.Login() }
Settings.getLayout = (page) => getHubNav(page, 'Paramètres')

export default Settings
