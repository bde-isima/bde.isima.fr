import { Color } from "@material-ui/core/Alert"
import { useState, SyntheticEvent } from "react"

export default function useSnackbar() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<Color>("success")

  const onShow = (severity: Color, message: string) => {
    setSeverity(severity)
    setMessage(message)
    setOpen(true)
  }

  const onClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    setOpen(false)
  }

  return {
    open,
    message,
    severity,
    onShow,
    onClose,
  }
}
