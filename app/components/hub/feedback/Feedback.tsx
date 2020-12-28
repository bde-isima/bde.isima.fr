import { useMutation } from "blitz"
import { SyntheticEvent } from "react"
import Paper from "@material-ui/core/Paper"
import NoSsr from "@material-ui/core/NoSsr"
import Typography from "@material-ui/core/Typography"

import FeedbackForm from "./FeedbackForm"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import { useCurrentUser } from 'app/hooks/useCurrentUser'
import feedback from "app/entities/users/mutations/feedback"
import { FeedbackInputType } from "app/components/forms/validations"

export default function Feedback() {
  const [user] = useCurrentUser()
  const [sendFeedback] = useMutation(feedback)
  const { open, message, severity } = useSnackbar()

  const onSuccess = async (data: FeedbackInputType) => {
    if(user) {
      await sendFeedback({
        ...data,
        from: `${user.lastname} ${user.firstname} (${user.email})`,
    })
      .then(() => {
        message.set("Envoyé")
        severity.set("success")
      })
      .catch((err) => {
        message.set(err.message)
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
        Feedback
      </Typography>

      <Typography color="textSecondary" variant="caption" paragraph>
        Vous pouvez aussi ouvrir une issue sur le{" "}
        <a
          href="https://github.com/IraSkyx/bde-isima/issues"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lien vers les issues Github"
        >
          Github dédié
        </a>
      </Typography>

      <NoSsr>
        <FeedbackForm onSuccess={onSuccess} />
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
