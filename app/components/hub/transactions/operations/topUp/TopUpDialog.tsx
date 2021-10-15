import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import Close from '@mui/icons-material/CloseTwoTone'

import { useMediaQuery } from 'app/core/styles/theme'
import SlideTransition from 'app/core/layouts/SlideTransition'
import TopUp from 'app/components/hub/transactions/operations/topUp/TopUp'

type TopUpDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TopUpDialog({ isOpen, onClose }: TopUpDialogProps) {
  const fullScreen = useMediaQuery('md')

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
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
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
