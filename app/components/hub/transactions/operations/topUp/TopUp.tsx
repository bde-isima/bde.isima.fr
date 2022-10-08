import { useState } from 'react'
import { useAuthenticatedSession } from 'blitz'

import TopUpForm from './TopUpForm'
import Snackbar from 'app/core/layouts/Snackbar'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import { TopUpInputType } from 'app/components/forms/validations'

export type PaymentMethod = 'cb' | 'lyf'

export default function TopUp() {
  const session = useAuthenticatedSession()
  const { open, message, severity, onShow, onClose } = useSnackbar()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cb')

  const beforeSubmit = (paymentMethod: PaymentMethod) => () => setPaymentMethod(paymentMethod)

  const onSuccess = (data: TopUpInputType) => {
    const body = new FormData()

    body.append('amount', `${data.amount}`)
    body.append('method', `${paymentMethod}`)

    return fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/refill/request/${session.userId}`, {
      method: 'POST',
      body,
    })
      .then((res) => res.json())
      .then((info) => window.location.assign(info.urlRequest))
      .catch((err) => onShow('error', err.message))
  }

  return (
    <>
      <TopUpForm beforeSubmit={beforeSubmit} onSuccess={onSuccess} />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  )
}
