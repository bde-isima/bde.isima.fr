import NoSsr from "@material-ui/core/NoSsr"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import DialogActions from "@material-ui/core/DialogActions"
import { useTheme, useMediaQuery } from "@material-ui/core"

import Close from "mdi-material-ui/Close"

import Transfer from "./Transfer"
import SlideTransition from "app/layouts/SlideTransition"

type TransferDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TransferDialog({ isOpen, onClose }: TransferDialogProps) {
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

        <Transfer onClose={onClose} />
      </Dialog>
    </NoSsr>
  )
}
