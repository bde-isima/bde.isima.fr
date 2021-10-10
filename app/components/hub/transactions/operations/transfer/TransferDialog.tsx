import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import { useTheme, useMediaQuery } from '@mui/material'

import Close from '@mui/icons-material/CloseTwoTone'

import Transfer from './Transfer'
import SlideTransition from 'app/core/layouts/SlideTransition'

type TransferDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TransferDialog({ isOpen, onClose }: TransferDialogProps) {
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
      >
        <DialogActions>
          <IconButton onClick={onClose} aria-label="Fermer" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <Transfer onClose={onClose} />
      </Dialog>
    </NoSsr>
  )
}
