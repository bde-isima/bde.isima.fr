import { useState } from 'react';

import { useAuthenticatedSession } from '@blitzjs/auth';
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
      (res) => {
        if (res.type == 'success') {
          window.location.assign(res.url as string);
        } else {
          switch (res.errorKind) {
            case 'internal':
              onShow('error', 'Topup failed: internal error');
          }
        }
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
