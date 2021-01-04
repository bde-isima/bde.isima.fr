import cuid from "cuid"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import Hidden from "@material-ui/core/Hidden"
import { useMutation, useQueryClient } from "react-query"

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
  const queryClient = useQueryClient()
  const [total, setTotal] = useState<number>(0)
  const { open, message, severity, onShow, onClose } = useSnackbar()
  const { eventSubscription } = useEventSubscription()

  const upsertEventSub = useMutation(upsertEventSubscription)
  const deleteEventSub = useMutation(deleteEventSubscription)

  const onSubscribe = () => {
    const { eventId, userId, ...restEventSub } = eventSubscription

    const args = {
      ...restEventSub,
      event: { connect: { id: eventId } },
      user: { connect: { id: userId } },
    } as any

    return upsertEventSub
      .mutateAsync({
        where: { id: eventSubscription.id ?? cuid() },
        update: args,
        create: args,
      })
      .then(() => router.push("/hub/events"))
      .catch((err) => onShow("error", err.message))
  }

  const onUnsubscribe = () => {
    return deleteEventSub
      .mutateAsync({ where: { id: eventSubscription.id } })
      .then(() => router.push("/hub/events"))
      .catch((err) => onShow("error", err.message))
  }

  const onQuantityChange = (cartItem: CartItem, value: number) => () => {
    let cart = eventSubscription.cart.filter((x) => x !== cartItem)

    if (cartItem.quantity + value > 0) {
      cart = [
        ...eventSubscription.cart.filter((x) => x !== cartItem),
        { ...cartItem, quantity: cartItem.quantity + value },
      ]
    }

    queryClient.setQueryData("getEventSubscription", (oldData) => ({
      ...(oldData as EventSubscriptionWithTypedCart),
      cart,
    }))
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
          subscribing={upsertEventSub.isLoading}
          onSubscribe={onSubscribe}
          unsubscribing={deleteEventSub.isLoading}
          onUnsubscribe={onUnsubscribe}
          onQuantityChange={onQuantityChange}
        />
      </Hidden>

      <Hidden mdUp>
        <Mobile
          event={event}
          total={total}
          subscribing={upsertEventSub.isLoading}
          onSubscribe={onSubscribe}
          unsubscribing={deleteEventSub.isLoading}
          onUnsubscribe={onUnsubscribe}
          onQuantityChange={onQuantityChange}
        />
      </Hidden>

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  )
}
