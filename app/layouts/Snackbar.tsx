import { forwardRef, ReactNode, SyntheticEvent } from 'react'
import MuiAlert, { AlertProps, Color } from "@material-ui/core/Alert"
import MuiSnackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar"

type SnackbarProps = {
  className?: string
  open: boolean
  loading?: boolean
  message: string
  severity: Color
  anchorOrigin?: SnackbarOrigin
  onClose: (event: SyntheticEvent | MouseEvent, reason?: string | undefined) => void
  action?: ReactNode
}

const Alert = forwardRef(function Alert(props: AlertProps, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Snackbar({ className = "", open, loading = false, message, severity, anchorOrigin = { vertical: "bottom", horizontal: "right" }, onClose, action = null }: SnackbarProps) {
  return (
    <MuiSnackbar
      className={className}
      open={open || loading}
      onClose={onClose}
      message={message}
      autoHideDuration={loading ? null : 6000}
      anchorOrigin={anchorOrigin}
      action={action}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
