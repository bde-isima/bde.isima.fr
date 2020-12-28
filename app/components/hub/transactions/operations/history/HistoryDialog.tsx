import NoSsr from "@material-ui/core/NoSsr"
import Dialog from "@material-ui/core/Dialog"
import IconButton from "@material-ui/core/IconButton"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import { useTheme, useMediaQuery } from "@material-ui/core"

import Close from "mdi-material-ui/Close"

import History from './History'
import HistoryHeader from './HistoryHeader'
import SlideTransition from "app/layouts/SlideTransition"
import { useCurrentUser } from 'app/hooks/useCurrentUser'

type HistoryDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function HistoryDialog({ isOpen, onClose }: HistoryDialogProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [user] = useCurrentUser()

  return (
    <NoSsr>
      <Dialog
        open={isOpen}
        onClose={onClose}
        keepMounted
        fullScreen={fullScreen}
        TransitionComponent={SlideTransition}
        aria-labelledby="history-dialog-title"
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogTitle id="history-dialog-title" disableTypography>
          <HistoryHeader />
        </DialogTitle>

        <DialogContent className="flex flex-col h-full items-center">
          <History userId={user?.id} />
        </DialogContent>
      </Dialog>
    </NoSsr>
  )
}
