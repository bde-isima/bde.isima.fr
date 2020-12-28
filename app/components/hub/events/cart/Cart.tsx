import cuid from "cuid"
import Hidden from "@material-ui/core/Hidden"
import { useMutation, useRouter } from "blitz"
import { useState, useEffect, SyntheticEvent } from "react"

import { Event } from "db"
import Mobile from "./Mobile"
import Desktop from "./Desktop"
import Snackbar from "app/layouts/Snackbar"
import useSnackbar from "app/hooks/useSnackbar"
import { CartItem, Option, EventSubscriptionWithTypedCart } from "types"
import { useEventSubscription } from "app/components/hub/events/subscription/EventSubscription"
import upsertEventSubscription from "app/entities/eventSubscriptions/mutations/upsertEventSubscription"
import deleteEventSubscription from "app/entities/eventSubscriptions/mutations/deleteEventSubscription"

type CartProps = {
  event: Event
}

export default function Cart({ event }: CartProps) {
  const router = useRouter()
  const [total, setTotal] = useState<number>(0)
  const { open, message, severity } = useSnackbar()
  const { eventSubscription, setQueryData } = useEventSubscription()

  const [upsertEventSub, { isLoading: subscribing }] = useMutation(upsertEventSubscription)
  const [deleteEventSub, { isLoading: unsubscribing }] = useMutation(deleteEventSubscription)

  const onSubscribe = () => {
    const { eventId, userId, ...restEventSub } = eventSubscription

    const args = {
      ...restEventSub,
      event: { connect: { id: eventId } },
      user: { connect: { id: userId } },
    } as any

    upsertEventSub({
      where: { id: eventSubscription.id ?? cuid() },
      update: args,
      create: args,
    })
      .then(() => router.push("/hub/events"))
      .catch((err) => {
        message.set(err.message)
        severity.set("error")
        open.set(true)
      })
  }

  const onUnsubscribe = () => {
    deleteEventSub({ where: { id: eventSubscription.id } })
      .then(() => router.push("/hub/events"))
      .catch((err) => {
        message.set(err.message)
        severity.set("error")
        open.set(true)
      })
  }

  const onQuantityChange = (cartItem: CartItem, value: number) => () => {
    let cart = eventSubscription.cart.filter((x) => x !== cartItem)

    if (cartItem.quantity + value > 0) {
      cart = [
        ...eventSubscription.cart.filter((x) => x !== cartItem),
        { ...cartItem, quantity: cartItem.quantity + value },
      ]
    }

    setQueryData((oldData) => ({
      ...(oldData as EventSubscriptionWithTypedCart),
      cart,
    }))
  }

  const onSnackClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
    if (reason === "clickaway") return
    open.set(false)
  }

  useEffect(() => {
    setTotal(
      eventSubscription.cart.reduce(
        (acc: number, x: CartItem) =>
          acc +
          x.quantity *
            (x.price + x.options.reduce((acc: number, val: Option) => acc + val.price, 0)),
        0
      )
    )
  }, [eventSubscription.cart])

  return (
    <>
      <Hidden mdDown>
        <Desktop
          event={event}
          total={total}
          subscribing={subscribing}
          onSubscribe={onSubscribe}
          unsubscribing={unsubscribing}
          onUnsubscribe={onUnsubscribe}
          onQuantityChange={onQuantityChange}
        />
      </Hidden>

      <Hidden mdUp>
        <Mobile
          event={event}
          total={total}
          subscribing={subscribing}
          onSubscribe={onSubscribe}
          unsubscribing={unsubscribing}
          onUnsubscribe={onUnsubscribe}
          onQuantityChange={onQuantityChange}
        />
      </Hidden>

      <Snackbar
        open={open.value}
        message={message.value}
        severity={severity.value}
        onClose={onSnackClose}
      />
    </>
  )
}
