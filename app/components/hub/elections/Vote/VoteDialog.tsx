import { useMutation } from "blitz"
import NoSsr from "@material-ui/core/NoSsr"
import { useTheme } from "@material-ui/core"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import DialogActions from "@material-ui/core/DialogActions"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Close from "mdi-material-ui/Close"

import { Candidate } from "db"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import SlideTransition from "app/layouts/SlideTransition"
import createVote from "app/entities/vote/mutations/createVote"
import VoteForm from "app/components/hub/elections/Vote/VoteForm"

type VoteDialogProps = {
  candidate: Candidate | null
  onClose: () => void
}

export default function VoteDialog({ candidate, onClose }: VoteDialogProps) {
  const [createVt] = useMutation(createVote)
  const { open, message, severity, onShow, onClose: onSnackClose } = useSnackbar()

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const onSuccess = async ({ approve, ...data }: any) => {
    await createVt({ data })
      .then(() => {
        onShow("success", "A voté !")
        onClose()
      })
      .catch((err) => onShow("error", err.message))
  }

  return (
    <NoSsr>
      <Dialog
        open={Boolean(candidate)}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        PaperProps={{ className: "w-full" }}
        TransitionComponent={SlideTransition}
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogActions>

        <VoteForm initialValues={candidate!} onSuccess={onSuccess} onClose={onClose} />
      </Dialog>

      <Snackbar open={open} message={message} severity={severity} onClose={onSnackClose} />
    </NoSsr>
  )
}
