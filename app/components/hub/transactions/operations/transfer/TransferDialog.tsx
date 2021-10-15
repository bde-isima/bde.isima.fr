import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'

import Close from '@mui/icons-material/CloseTwoTone'

import Transfer from './Transfer'
import { useMediaQuery } from 'app/core/styles/theme'
import SlideTransition from 'app/core/layouts/SlideTransition'

type TransferDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export default function TransferDialog({ isOpen, onClose }: TransferDialogProps) {
  const fullScreen = useMediaQuery('md')

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
