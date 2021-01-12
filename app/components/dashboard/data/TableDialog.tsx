import cuid from "cuid"
import NoSsr from "@material-ui/core/NoSsr"
import Dialog from "@material-ui/core/Dialog"
import { useMutation, invalidateQuery } from "blitz"

import Snackbar from "app/layouts/Snackbar"
import SlideTransition from "app/layouts/SlideTransition"

export default function TableDialog({
  open,
  values,
  columns,
  onClose,
  getQuery,
  upsertQuery,
  snackbar,
  FormComponent,
}) {
  const { snackOpen, message, severity, onShow, onClose: onSnackClose } = snackbar

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
        onShow("success", "Sauvegardé")
        invalidateQuery(getQuery)
        onClose()
      })
      .catch((err) => {
        if (err.code === "P2002") {
          onShow("error", `${err.meta.target[0]} n'est pas unique`)
        } else {
          onShow("error", err.message)
        }
      })
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

      <Snackbar open={snackOpen} message={message} severity={severity} onClose={onSnackClose} />
    </NoSsr>
  )
}
