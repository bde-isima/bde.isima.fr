import { useState } from 'react';

import { useMutation } from '@blitzjs/rpc';

import { TopUpInputType } from 'app/components/forms/validations';
import Snackbar from 'app/core/layouts/Snackbar';
import useSnackbar from 'app/entities/hooks/useSnackbar';
import requestTopUp, { PaymentMethod } from 'app/entities/transactions/mutations/requestTopUp';

import TopUpForm from './TopUpForm';

export default function TopUp() {
  const { open, message, severity, onClose, onShow } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [topUp] = useMutation(requestTopUp);

  const beforeSubmit = (paymentMethod: PaymentMethod) => () => setPaymentMethod(paymentMethod);

  const onSuccess = (data: TopUpInputType) => {
    topUp({
      amount: data.amount,
      method: paymentMethod
    }).then(
      (url) => {
        window.location.assign(url as string);
      },
      (error) => {
        onShow('error', error.message);
      }
    );
  };

  return (
    <>
      <TopUpForm beforeSubmit={beforeSubmit} onSuccess={onSuccess} />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  );
}
