import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { EventSubscriptionWithTypedCart } from 'global';

import CreditCard from '@mui/icons-material/CreditCardTwoTone';
import LocalAtm from '@mui/icons-material/LocalAtmTwoTone';
import PhoneAndroid from '@mui/icons-material/PhoneAndroidTwoTone';

import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription';

export default function PaymentMethods() {
  const { eventSubscription, setQueryData } = useEventSubscription();

  const onPaymentMethodChange = (payment_method) => () => {
    setQueryData(
      ({ EventSubscription, ...oldData }) => ({
        ...oldData,
        EventSubscription: [
          {
            ...(EventSubscription[0] as EventSubscriptionWithTypedCart),
            payment_method
          }
        ]
      }),
      { refetch: false }
    );
  };

  return (
    <ButtonGroup className="w-full" aria-label="Méthodes de paiement">
      <Tooltip title="Payer par LYF">
        <Button
          className="w-full"
          startIcon={<PhoneAndroid />}
          aria-label="Payer par LYF"
          variant={eventSubscription?.payment_method === 'LYF' ? 'contained' : 'outlined'}
          onClick={onPaymentMethodChange('LYF')}
          color={eventSubscription?.payment_method === 'LYF' ? 'primary' : 'neutral'}
        >
          <Typography variant="caption">LYF</Typography>
        </Button>
      </Tooltip>

      <Tooltip title="Payer par carte BDE">
        <Button
          className="w-full"
          startIcon={<CreditCard />}
          aria-label="Payer par carte BDE"
          variant={eventSubscription?.payment_method === 'BDE' ? 'contained' : 'outlined'}
          onClick={onPaymentMethodChange('BDE')}
          color={eventSubscription?.payment_method === 'BDE' ? 'primary' : 'neutral'}
        >
          <Typography variant="caption">BDE</Typography>
        </Button>
      </Tooltip>

      <Tooltip title="Payer en liquide">
        <Button
          className="w-full"
          startIcon={<LocalAtm />}
          aria-label="Payer en liquide"
          variant={eventSubscription?.payment_method === 'CASH' ? 'contained' : 'outlined'}
          onClick={onPaymentMethodChange('CASH')}
          color={eventSubscription?.payment_method === 'CASH' ? 'primary' : 'neutral'}
        >
          <Typography variant="caption">LIQUIDE</Typography>
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}
