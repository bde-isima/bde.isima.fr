import IconButton from '@mui/material/IconButton'
import { forwardRef, SyntheticEvent } from 'react'
import Alert, { AlertColor } from '@mui/material/Alert'
import MuiSnackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

import Undo from '@mui/icons-material/UndoTwoTone'
import Close from '@mui/icons-material/CloseTwoTone'

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
    >
      <Alert
        elevation={6}
        onClose={onClose}
        severity={severity}
        variant="filled"
        action={
          <>
            {onUndo && (
              <IconButton
                className="m-1"
                size="small"
                aria-label="Annuler"
                color="inherit"
                onClick={onUndo}
              >
                <Undo />
              </IconButton>
            )}
            <IconButton size="small" aria-label="Fermer" color="inherit" onClick={onClose}>
              <Close />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
