import { useMutation } from '@blitzjs/rpc';

import { TopUpInputType } from 'app/components/forms/validations';
import Snackbar from 'app/core/layouts/Snackbar';
import useSnackbar from 'app/entities/hooks/useSnackbar';
import requestTopUp from 'app/entities/transactions/mutations/requestTopUp';

import TopUpForm from './TopUpForm';

export default function TopUp() {
  const { open, message, severity, onClose, onShow } = useSnackbar();
  const [topUp] = useMutation(requestTopUp);

  const onSuccess = (data: TopUpInputType) => {
    topUp({
      amount: data.amount
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
      <TopUpForm onSuccess={onSuccess} />

      <Snackbar open={open} message={message} severity={severity} onClose={onClose} />
    </>
  );
}
