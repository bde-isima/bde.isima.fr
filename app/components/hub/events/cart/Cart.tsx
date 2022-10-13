import { useEffect, useState } from 'react';

import cuid from 'cuid';
import type { CartItem, EventSubscriptionWithTypedCart, Option } from 'global';

import { useMutation } from '@blitzjs/rpc';

import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription';
import Snackbar from 'app/core/layouts/Snackbar';
import { useRouter } from 'app/core/lib/router';
import deleteEventSubscription from 'app/entities/eventSubscriptions/mutations/deleteEventSubscription';
import upsertEventSubscription from 'app/entities/eventSubscriptions/mutations/upsertEventSubscription';
import useSnackbar from 'app/entities/hooks/useSnackbar';

import Desktop from './Desktop';
import Mobile from './Mobile';

export default function Cart() {
  const { router } = useRouter();
  const [total, setTotal] = useState<number>(0);
  const { open, message, severity, onShow, onClose } = useSnackbar();
  const { eventSubscription, setQueryData } = useEventSubscription();

  const [upsertEventSub, { isLoading: subscribing }] = useMutation(upsertEventSubscription);
  const [deleteEventSub, { isLoading: unsubscribing }] = useMutation(deleteEventSubscription);

  const onSubscribe = () => {
    const { eventId, userId, ...restEventSub } = eventSubscription;

    const args = {
      ...restEventSub,
      event: { connect: { id: eventId } },
      user: { connect: { id: userId } }
    } as any;

    return upsertEventSub({
      where: { id: eventSubscription.id ?? cuid() },
      update: args,
      create: args
    })
      .then(() => router.push('/hub/events'))
      .catch((err) => onShow('error', err.message));
  };

  const onUnsubscribe = () => {
    return deleteEventSub({ where: { id: eventSubscription.id } })
      .then(() => router.push('/hub/events'))
      .catch((err) => onShow('error', err.message));
  };

  const onQuantityChange = (cartItem: CartItem, value: number) => () => {
    let cart = eventSubscription.cart.filter((x) => x !== cartItem);

    if (cartItem.quantity + value > 0) {
      cart = [
        ...eventSubscription.cart.filter((x) => x !== cartItem),
        { ...cartItem, quantity: cartItem.quantity + value }
      ];
    }

    setQueryData(
      ({ EventSubscription, ...oldData }) => ({
        ...oldData,
        EventSubscription: [
          {
            ...(EventSubscription[0] as EventSubscriptionWithTypedCart),
            cart
          }
        ]
      }),
      { refetch: false }
    );
  };

  useEffect(() => {
    setTotal(
      eventSubscription?.cart.reduce(
        (acc: number, x: CartItem) =>
          acc + x.quantity * (x.price + (x.options?.reduce((acc: number, val: Option) => acc + val.price, 0) || 0)),
        0
      ) || 0
    );
  }, [eventSubscription?.cart]);

  return (
    <>
      <Desktop
        total={total}
        subscribing={subscribing}
        onSubscribe={onSubscribe}
        unsubscribing={unsubscribing}
        onUnsubscribe={onUnsubscribe}
        onQuantityChange={onQuantityChange}
      />

      <Mobile
        total={total}
        subscribing={subscribing}
        onSubscribe={onSubscribe}
        unsubscribing={unsubscribing}
        onUnsubscribe={onUnsubscribe}
        onQuantityChange={onQuantityChange}
      />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  );
}
