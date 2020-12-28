import NoSsr from "@material-ui/core/NoSsr"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { useTheme, useMediaQuery } from "@material-ui/core"

import Close from "mdi-material-ui/Close"

import SlideTransition from "app/layouts/SlideTransition"
import TopUp from 'app/components/hub/transactions/operations/topUp/TopUp'

type TopUpDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TopUpDialog({ isOpen, onClose }: TopUpDialogProps) {
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
        aria-labelledby="topup-dialog-title"
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogContent className="flex flex-col h-full items-center">
          <TopUp />
        </DialogContent>
      </Dialog>
    </NoSsr>
  )
}
