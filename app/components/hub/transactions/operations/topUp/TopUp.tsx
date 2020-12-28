import { useState, SyntheticEvent } from 'react';

import TopUpForm from "./TopUpForm"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from 'app/hooks/useSnackbar'
import { TopUpInputType } from "app/components/forms/validations"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export type PaymentMethod = 'cb' | 'lydia'

export default function TopUp() {
  const [user] = useCurrentUser()
  const { open, message, severity } = useSnackbar()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cb')

  const beforeSubmit = (paymentMethod: PaymentMethod) => () => {
    setPaymentMethod(paymentMethod)
  }

  const onSuccess = async (data: TopUpInputType) => {
    if(user) {
      const body = new FormData()

      body.append('amount', data.amount)
      body.append('paymentMethod', paymentMethod)
      body.append('vendor_token', `${process.env.NEXT_PUBLIC_LYDIA_API_VENDOR_TOKEN}`)
      body.append('recipient', data.recipient)
      body.append('message', `Recharge compte BDE +${data.amount} €`)
      body.append('currency', "EUR")
      body.append('type', 'phone')
      body.append('order_ref', `${user.id}-${new Date().toISOString()}`)
      body.append('confirm_url', `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/confirm_payment/${user.id}`)

      await fetch(`${process.env.NEXT_PUBLIC_LYDIA_API_URL}/api/request/do.json`, { method: 'POST', body })
        .then(res => res.json())
        .then(info => {
          window.location.assign(info.mobile_url)
        })
        .catch((err) => {
          message.set(err?.message)
          severity.set("error")
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
      <TopUpForm beforeSubmit={beforeSubmit} onSuccess={onSuccess} />

      <Snackbar
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </>
  )
}
