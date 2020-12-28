import NoSsr from "@material-ui/core/NoSsr"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import DialogActions from "@material-ui/core/DialogActions"
import { useTheme, useMediaQuery } from "@material-ui/core"

import Close from "mdi-material-ui/Close"

import AddSubscriptionForm from './AddSubscriptionForm'
import SlideTransition from "app/layouts/SlideTransition"

type AddSubscriptionDialogProps = {
  isOpen: boolean
  onSuccess: (values) => void
  onClose: () => void
}

export default function AddSubscriptionDialog({ isOpen, onSuccess, onClose }: AddSubscriptionDialogProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <NoSsr>
      <Dialog
        open={isOpen}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        TransitionComponent={SlideTransition}
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogActions>

        <AddSubscriptionForm onSuccess={onSuccess} onClose={onClose} />
      </Dialog>
    </NoSsr>
  )
}