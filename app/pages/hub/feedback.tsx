import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { BlitzPage, Routes, useMutation, useAuthenticatedSession } from 'blitz'

import Snackbar from 'app/core/layouts/Snackbar'
import getHubNav from 'app/components/nav/hub/getHubNav'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import feedback from 'app/entities/users/mutations/feedback'
import FeedbackForm from 'app/components/hub/feedback/FeedbackForm'
import { FeedbackInputType } from 'app/components/forms/validations'

const Feedback: BlitzPage = () => {
  const session = useAuthenticatedSession()
  const { open, message, severity, onShow, onClose } = useSnackbar()

  const [sendFeedback] = useMutation(feedback)

  const onSuccess = (data: FeedbackInputType) => {
    return sendFeedback({
      ...data,
      from: `${session?.lastname} ${session?.firstname} (${session?.email})`,
    })
      .then(() => onShow('success', 'Envoyé'))
      .catch((err) => onShow('error', err.message))
  }

  return (
    <Paper className="p-4">
      <Typography variant="h4" paragraph>
        Feedback
      </Typography>

      <Typography color="textSecondary" variant="caption" paragraph>
        Vous pouvez aussi ouvrir une issue sur le{' '}
        <a
          className="text-blue-400"
          href="https://github.com/IraSkyx/bde-isima/issues"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Lien vers les issues Github"
        >
          Github dédié
        </a>
      </Typography>

      <FeedbackForm onSuccess={onSuccess} />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </Paper>
  )
}

Feedback.suppressFirstRenderFlicker = true
Feedback.authenticate = { redirectTo: Routes.Login() }
Feedback.getLayout = (page) => getHubNav(page, "Retours d'expérience")

export default Feedback
