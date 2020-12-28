import cuid from "cuid"
import { useMutation } from "blitz"
import { SyntheticEvent } from "react"
import NoSsr from "@material-ui/core/NoSsr"
import Dialog from "@material-ui/core/Dialog"

import Snackbar from "app/layouts/Snackbar"
import SlideTransition from "app/layouts/SlideTransition"

export default function TableDialog({
  open,
  values,
  columns,
  onClose,
  upsertQuery,
  refetch,
  snackbar,
  FormComponent,
}) {
  const { snackOpen, message, severity } = snackbar

  const [upsertMutation] = useMutation(upsertQuery)

  const formatData = (data) => {
    const formattedData = { ...data }
    columns.forEach((col) => {
      let value = data[col.id]

      if (typeof col.format === "function") {
        value = col.format(data[col.id])
      }

      if (typeof value === "string") {
        value = value.trim()
      }

      Object.assign(formattedData, { [col.id]: value })
    })
    return formattedData
  }

  const onSuccess = async (data) => {
    await upsertMutation({
      where: { id: values.id ?? cuid() },
      update: formatData(data),
      create: formatData(data),
    } as any)
      .then(() => {
        message.set("Sauvegardé")
        severity.set("success")
        onClose()
      })
      .catch((err) => {
        if (err.code === "P2002") {
          message.set(`${err.meta.target[0]} n'est pas unique`)
        } else {
          message.set(err.message)
        }
        severity.set("error")
      })
      .finally(() => {
        snackOpen.set(true)
      })

    refetch()
  }

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    snackOpen.set(false)
  }

  return (
    <NoSsr>
      <Dialog
        open={open}
        classes={{ paper: "min-h-main" }}
        fullScreen
        onClose={onClose}
        TransitionComponent={SlideTransition}
        aria-labelledby="table-dialog-title"
        aria-describedby="table-dialog-description"
      >
        <FormComponent initialValues={values} onSuccess={onSuccess} onClose={onClose} />
      </Dialog>

      <Snackbar
        open={snackOpen.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </NoSsr>
  )
}
