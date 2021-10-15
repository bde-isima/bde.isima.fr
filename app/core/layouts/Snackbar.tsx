import { SyntheticEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import Alert, { AlertColor } from '@mui/material/Alert'
import MuiSnackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

import Undo from '@mui/icons-material/UndoTwoTone'
import Close from '@mui/icons-material/CloseTwoTone'

import SlideTransition from 'app/core/layouts/SlideTransition'

type SnackbarProps = {
  className?: string
  open: boolean
  loading?: boolean
  message: string
  severity: AlertColor
  anchorOrigin?: SnackbarOrigin
  onClose: (event: SyntheticEvent | MouseEvent, reason?: string | undefined) => void
  onUndo?: (() => void) | undefined
}

export default function Snackbar({
  className = '',
  open,
  loading = false,
  message,
  severity,
  anchorOrigin = { vertical: 'bottom', horizontal: 'right' },
  onClose,
  onUndo,
}: SnackbarProps) {
  return (
    <MuiSnackbar
      className={className}
      open={open || loading}
      onClose={onClose}
      message={message}
      autoHideDuration={loading ? null : 6000}
      anchorOrigin={anchorOrigin}
      TransitionComponent={SlideTransition}
    >
      <Alert
        elevation={6}
        onClose={onClose}
        severity={severity}
        variant="filled"
        action={
          <div>
            {onUndo && (
              <IconButton size="small" aria-label="Annuler" color="inherit" onClick={onUndo}>
                <Undo />
              </IconButton>
            )}
            <IconButton size="small" aria-label="Fermer" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        }
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
