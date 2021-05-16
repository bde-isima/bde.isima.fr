import { useMutation } from "blitz"
import Paper from "@material-ui/core/Paper"
import NoSsr from "@material-ui/core/NoSsr"
import Typography from "@material-ui/core/Typography"

import Snackbar from "app/layouts/Snackbar"
import PageTitle from "app/layouts/PageTitle"
import useSnackbar from "app/hooks/useSnackbar"
import feedback from "app/entities/users/mutations/feedback"
import { useBDESession } from "app/components/auth/SessionProvider"
import AverageForm from "app/components/hub/modules/average/AverageForm"

export default function Average() {
  const session = useBDESession()
  const { open, message, severity, onShow, onClose } = useSnackbar()

  return (
    <>
      <PageTitle title="Calculateur de moyenne" />

      <Paper className="p-4">
        <Typography variant="h4" paragraph>
          Calculateur de moyenne
        </Typography>

        <Typography color="textSecondary" variant="caption" paragraph>
          Séléctionnez votre année, remplissez le tableau et votre moyenne sera calculée. <br />
          Les données saisies seront uniquement stockées sur votre navigateur et resteront
          strictement personnelles.
        </Typography>

        <NoSsr>
          <AverageForm />
        </NoSsr>

        <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
      </Paper>
    </>
  )
}
