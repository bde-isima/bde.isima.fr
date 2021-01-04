import { useMutation } from "react-query"
import Paper from "@material-ui/core/Paper"
import NoSsr from "@material-ui/core/NoSsr"
import { useSession } from "next-auth/client"
import Typography from "@material-ui/core/Typography"

import Snackbar from "app/layouts/Snackbar"
import PageTitle from "app/layouts/PageTitle"
import useSnackbar from "app/hooks/useSnackbar"
import feedback from "app/entities/users/mutations/feedback"
import FeedbackForm from "app/components/hub/feedback/FeedbackForm"
import { FeedbackInputType } from "app/components/forms/validations"

export default function Feedback() {
  const [session] = useSession()
  const sendFeedback = useMutation(feedback)
  const { open, message, severity, onShow, onClose } = useSnackbar()

  const onSuccess = (data: FeedbackInputType) => {
    return sendFeedback
      .mutateAsync({
        ...data,
        from: `${session?.user?.lastname} ${session?.user?.firstname} (${session?.user?.email})`,
      })
      .then(() => onShow("success", "Envoyé"))
      .catch((err) => onShow("error", err.message))
  }

  return (
    <>
      <PageTitle title="Retours d'expérience" />

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

        <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
      </Paper>
    </>
  )
}
