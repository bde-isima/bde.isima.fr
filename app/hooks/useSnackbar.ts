import { useState } from "react"
import { Color } from "@material-ui/core/Alert"

export default function useSnackbar() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<Color>("success")

  return {
    open: {
      value: open,
      set: setOpen,
    },
    message: {
      value: message,
      set: setMessage,
    },
    severity: {
      value: severity,
      set: setSeverity,
    },
  }
}
