import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import { useTheme, useMediaQuery } from '@mui/material'

import Close from '@mui/icons-material/CloseTwoTone'

import SlideTransition from 'app/core/layouts/SlideTransition'
import TopUp from 'app/components/hub/transactions/operations/topUp/TopUp'

type TopUpDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TopUpDialog({ isOpen, onClose }: TopUpDialogProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))

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
