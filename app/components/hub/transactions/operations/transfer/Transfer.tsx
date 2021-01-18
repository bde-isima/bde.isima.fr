import { useMutation, invalidateQuery } from "blitz"

import TransferForm from "./TransferForm"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import { useBDESession } from "app/components/auth/SessionProvider"
import { TransferInputType } from "app/components/forms/validations"
import getCurrentUser from "app/entities/users/queries/getCurrentUser"
import getTransactions from "app/entities/transactions/queries/getTransactions"
import createTransferTransaction from "app/entities/transactions/mutations/createTransferTransaction"

type TransferProps = {
  onClose: () => void
}

export default function Transfer({ onClose }: TransferProps) {
  const { open, message, severity, onShow, onClose: onSnackClose } = useSnackbar()

  const session = useBDESession()
  const [createTransaction] = useMutation(createTransferTransaction)

  const onSuccess = (data: TransferInputType) => {
    return createTransaction({
      data: {
        amount: data.amount,
        description: data.description,
        user: { connect: { id: data.receiver.id } },
        emitter: { connect: { id: session?.userId } },
      },
    })
      .then(() => {
        onShow("success", "Envoyé")
        invalidateQuery(getCurrentUser)
        invalidateQuery(getTransactions)
      })
      .catch((err) => onShow("error", err.message))
  }

  return (
    <>
      <TransferForm onSuccess={onSuccess} onClose={onClose} />

      <Snackbar open={open} message={message} severity={severity} onClose={onSnackClose} />
    </>
  )
}
