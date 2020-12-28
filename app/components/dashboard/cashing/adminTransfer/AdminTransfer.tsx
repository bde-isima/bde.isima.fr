import { useMutation } from "blitz"
import { SyntheticEvent } from "react"
import { useTheme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { User } from 'db'
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import AdminTransferForm from "./AdminTransferForm"
import { AdminTransferInputType } from "app/components/forms/validations"
import createAdminTransaction from "app/entities/transactions/mutations/createAdminTransaction"

type AdminTransferProps = {
  user: User | null
  updateBalance: (amount) => void
}

export default function AdminTransfer({ user, updateBalance }: AdminTransferProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { open, message, severity } = useSnackbar()

  const [createTransaction] = useMutation(createAdminTransaction)

  const onSuccess = async (data: AdminTransferInputType) => {
    if (user?.id) {
      const amount = parseFloat(data.amount)
      await createTransaction({
        data: {
          amount,
          description: data.description,
          user: { connect: { id: user.id } },
        },
      })
        .then(() => {
          message.set("Envoyé")
          severity.set("success")
          updateBalance(amount)
        })
        .catch((err) => {
          message.set(err?.message)
          severity.set("error")
        })
        .finally(() => {
          open.set(true)
        })
    }
  }

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    open.set(false)
  }

  return (
    <>
      <AdminTransferForm  onSuccess={onSuccess} />

      <Snackbar
        className={fullScreen ? "bottom-16" : ""}
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: fullScreen ? 'center' : 'right' }}
      />
    </>
  )
}
