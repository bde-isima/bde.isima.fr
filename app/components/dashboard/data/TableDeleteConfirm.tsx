import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'

import SlideTransition from 'app/core/layouts/SlideTransition'

export default function TableDeleteConfirm({ open, onConfirm, onClose }) {
  const onConfirmation = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      keepMounted
      TransitionComponent={SlideTransition}
      aria-labelledby="table-delete-confirm-title"
      aria-describedby="table-delete-confirm-description"
    >
      <DialogTitle id="table-delete-confirm-title">
        Êtes-vous sûr d'effectuer cette action ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="table-delete-confirm-description">
          Toute suppression est définitive.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Annuler
        </Button>
        <Button onClick={onConfirmation} variant="contained" color="primary">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  )
}
