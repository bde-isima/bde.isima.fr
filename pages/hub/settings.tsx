import { useMutation } from "react-query"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import Snackbar from "app/layouts/Snackbar"
import PageTitle from "app/layouts/PageTitle"
import useSnackbar from "app/hooks/useSnackbar"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import updateUser from "app/entities/users/mutations/updateUser"
import SettingsForm from "app/components/hub/settings/SettingsForm"
import { SettingsInputType } from "app/components/forms/validations"

export default function Settings() {
  const { data: user } = useCurrentUser()
  const updtUser = useMutation(updateUser)

  const { open, message, severity, onShow, onClose } = useSnackbar()

  const onSuccess = (data: SettingsInputType) => {
    return updtUser
      .mutateAsync({
        where: { id: user?.id },
        data,
      })
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

        <SettingsForm initialValues={user} onSuccess={onSuccess} />

        <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
      </Paper>
    </>
  )
}
