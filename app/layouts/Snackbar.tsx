import { forwardRef, SyntheticEvent } from "react"
import IconButton from "@material-ui/core/IconButton"
import MuiAlert, { AlertProps, Color } from "@material-ui/core/Alert"
import MuiSnackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar"

import Undo from "mdi-material-ui/Undo"
import Close from "mdi-material-ui/Close"

type SnackbarProps = {
  className?: string
  open: boolean
  loading?: boolean
  message: string
  severity: Color
  anchorOrigin?: SnackbarOrigin
  onClose: (event: SyntheticEvent | MouseEvent, reason?: string | undefined) => void
  onUndo?: (() => void) | undefined
}

const Alert = forwardRef(function Alert(props: AlertProps, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Snackbar({
  className = "",
  open,
  loading = false,
  message,
  severity,
  anchorOrigin = { vertical: "bottom", horizontal: "right" },
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
        onClose={onClose}
        severity={severity}
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
