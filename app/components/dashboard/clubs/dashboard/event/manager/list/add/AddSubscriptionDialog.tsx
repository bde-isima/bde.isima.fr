import NoSsr from '@mui/material/NoSsr'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import DialogActions from '@mui/material/DialogActions'
import { useTheme, useMediaQuery } from '@mui/material'

import Close from 'mdi-material-ui/Close'

import AddSubscriptionForm from './AddSubscriptionForm'
import SlideTransition from 'app/core/layouts/SlideTransition'

type AddSubscriptionDialogProps = {
  isOpen: boolean
  onSuccess: (values) => void
  onClose: () => void
}

export default function AddSubscriptionDialog({
  isOpen,
  onSuccess,
  onClose,
}: AddSubscriptionDialogProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

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

        <AddSubscriptionForm onSuccess={onSuccess} onClose={onClose} />
      </Dialog>
    </NoSsr>
  );
}
