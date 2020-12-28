import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

import SlideTransition from "app/layouts/SlideTransition"

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
