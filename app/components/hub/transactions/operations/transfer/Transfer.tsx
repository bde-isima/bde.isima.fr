import { useAuthenticatedSession } from '@blitzjs/auth'
import { useMutation, invalidateQuery } from '@blitzjs/rpc'

import TransferForm from './TransferForm'
import Snackbar from 'app/core/layouts/Snackbar'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import { TransferInputType } from 'app/components/forms/validations'
import getCurrentUser from 'app/entities/users/queries/getCurrentUser'
import getTransactions from 'app/entities/transactions/queries/getTransactions'
import createTransferTransaction from 'app/entities/transactions/mutations/createTransferTransaction'

type TransferProps = {
  onClose: () => void
}

export default function Transfer({ onClose }: TransferProps) {
  const session = useAuthenticatedSession()
  const [createTransaction] = useMutation(createTransferTransaction)
  const { open, message, severity, onShow, onClose: onSnackClose } = useSnackbar()

  const onSuccess = async (data: TransferInputType) => {
    try {
      const transaction = await createTransaction({
        data: {
          amount: data.amount,
          description: data.description,
          user: { connect: { id: data.receiver.id } },
          emitter: { connect: { id: session?.userId } }
        }
      })

      onShow('success', 'Envoyé')
      await invalidateQuery(getCurrentUser)
      await invalidateQuery(getTransactions)

      return transaction
    } catch (err) {
      onShow('error', err.message)
    }
  }

  return (
    <>
      <TransferForm onSuccess={onSuccess} onClose={onClose} />

      <Snackbar open={open} message={message} severity={severity} onClose={onSnackClose} />
    </>
  )
}
