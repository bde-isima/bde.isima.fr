import { useMutation } from "blitz"
import { SyntheticEvent } from "react"
import NoSsr from "@material-ui/core/NoSsr"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import SettingsForm from "./SettingsForm"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import { SettingsInputType } from "app/components/forms/validations"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import updateUser from "app/entities/users/mutations/updateUser"

export default function Settings() {
  const [user, { setQueryData }] = useCurrentUser()
  const [updateUserMutation] = useMutation(updateUser)

  const { open, message, severity } = useSnackbar()

  const onSuccess = async (data: SettingsInputType) => {
    if (user?.id) {
      await setQueryData(
        (oldData) => ({
          ...oldData!,
          ...data,
        }),
        { refetch: false }
      )

      await updateUserMutation({
        where: { id: user.id },
        data,
      })
        .then(() => {
          message.set("Sauvegardé")
          severity.set("success")
        })
        .catch((err) => {
          message.set(JSON.stringify(err))
          severity.set("error")
        })
        .finally(() => open.set(true))
    }
  }

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    open.set(false)
  }

  return (
    <Paper className="p-4">
      <Typography variant="h4" paragraph>
        Paramètres
      </Typography>

      <NoSsr>
        <SettingsForm initialValues={user} onSuccess={onSuccess} />
      </NoSsr>

      <Snackbar
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </Paper>
  )
}
