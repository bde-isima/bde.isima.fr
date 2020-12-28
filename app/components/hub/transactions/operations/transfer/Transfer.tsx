import { useMutation } from "blitz"
import { SyntheticEvent } from "react"

import TransferForm from "./TransferForm"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { TransferInputType } from "app/components/forms/validations"
import createTransferTransaction from "app/entities/transactions/mutations/createTransferTransaction"

type TransferProps = {
  onClose: () => void
}

export default function Transfer({ onClose }: TransferProps) {
  const { open, message, severity } = useSnackbar()

  const [user, { refetch: refetchUser }] = useCurrentUser()
  const [createTransaction] = useMutation(createTransferTransaction)

  const onSuccess = async (data: TransferInputType) => {
    if (user?.id) {
      await createTransaction({
        data: {
          amount: parseFloat(data.amount),
          description: data.description,
          user: { connect: { id: data.receiver.id } },
          emitter: { connect: { id: user.id } },
        },
      })
        .then(() => {
          message.set("Envoyé")
          severity.set("success")
          refetchUser()
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
      <TransferForm 
        onSuccess={onSuccess} 
        onClose={onClose} 
      />

      <Snackbar
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </>
  )
}
