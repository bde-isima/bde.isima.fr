import { Suspense } from "react"
import Paper from "@material-ui/core/Paper"
import { useMutation, useSession } from "blitz"
import Typography from "@material-ui/core/Typography"
import CircularProgress from "@material-ui/core/CircularProgress"

import Snackbar from "app/layouts/Snackbar"
import PageTitle from "app/layouts/PageTitle"
import useSnackbar from "app/hooks/useSnackbar"
import updateUser from "app/entities/users/mutations/updateUser"
import SettingsForm from "app/components/hub/settings/SettingsForm"
import { SettingsInputType } from "app/components/forms/validations"

export default function Settings() {
  const session = useSession()

  const [updtUser] = useMutation(updateUser)

  const { open, message, severity, onShow, onClose } = useSnackbar()

  const onSuccess = (data: SettingsInputType) => {
    return updtUser({ where: { id: session?.userId }, data })
      .then(() => onShow("success", "Sauvegardé"))
      .catch((err) => onShow("error", err.message))
  }

  return (
    <>
      <PageTitle title="Paramètres" />

      <Paper className="p-4">
        <Typography variant="h4" paragraph>
          Paramètres
        </Typography>

        <Suspense fallback={<CircularProgress className="mx-auto" size={25} />}>
          <SettingsForm onSuccess={onSuccess} />
        </Suspense>

        <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
      </Paper>
    </>
  )
}
