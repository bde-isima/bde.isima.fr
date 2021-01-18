import { useState } from "react"

import TopUpForm from "./TopUpForm"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import { TopUpInputType } from "app/components/forms/validations"
import { useBDESession } from "app/components/auth/SessionProvider"

export type PaymentMethod = "cb" | "lydia"

export default function TopUp() {
  const session = useBDESession()
  const { open, message, severity, onShow, onClose } = useSnackbar()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cb")

  const beforeSubmit = (paymentMethod: PaymentMethod) => () => setPaymentMethod(paymentMethod)

  const onSuccess = (data: TopUpInputType) => {
    const body = new FormData()

    body.append("amount", data.amount.toString())
    body.append("paymentMethod", paymentMethod)
    body.append("vendor_token", `${process.env.NEXT_PUBLIC_LYDIA_API_VENDOR_TOKEN}`)
    body.append("recipient", data.recipient)
    body.append("message", `Recharge compte BDE +${data.amount} €`)
    body.append("currency", "EUR")
    body.append("type", "phone")
    body.append("order_ref", `${session?.userId}-${new Date().toISOString()}`)
    body.append(
      "confirm_url",
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/confirm_payment/${session?.userId}`
    )

    return fetch(`${process.env.NEXT_PUBLIC_LYDIA_API_URL}/api/request/do.json`, {
      method: "POST",
      body,
    })
      .then((res) => res.json())
      .then((info) => window.location.assign(info.mobile_url))
      .catch((err) => onShow("error", err.message))
  }

  return (
    <>
      <TopUpForm beforeSubmit={beforeSubmit} onSuccess={onSuccess} />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  )
}
