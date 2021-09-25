import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'

import Cellphone from 'mdi-material-ui/Cellphone'
import CardBulleted from 'mdi-material-ui/CardBulleted'
import CashMultiple from 'mdi-material-ui/CashMultiple'

import { EventSubscriptionWithTypedCart } from 'types'
import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription'

export default function PaymentMethods() {
  const { eventSubscription, setQueryData } = useEventSubscription()

  const onPaymentMethodChange = (payment_method) => () => {
    setQueryData(
      ({ EventSubscription, ...oldData }) => ({
        ...oldData,
        EventSubscription: [
          {
            ...(EventSubscription[0] as EventSubscriptionWithTypedCart),
            payment_method,
          },
        ],
      }),
      { refetch: false }
    )
  }

  return (
    <ButtonGroup className="w-full" aria-label="Méthodes de paiement">
      <Tooltip title="Payer par LYDIA">
        <Button
          className="w-full"
          startIcon={<Cellphone />}
          aria-label="Payer par LYDIA"
          variant={eventSubscription?.payment_method === 'LYDIA' ? 'contained' : 'outlined'}
          onClick={onPaymentMethodChange('LYDIA')}
          color={eventSubscription?.payment_method === 'LYDIA' ? 'primary' : 'inherit'}
        >
          <Typography variant="caption">LYDIA</Typography>
        </Button>
      </Tooltip>

      <Tooltip title="Payer par carte BDE">
        <Button
          className="w-full"
          startIcon={<CardBulleted />}
          aria-label="Payer par carte BDE"
          variant={eventSubscription?.payment_method === 'BDE' ? 'contained' : 'outlined'}
          onClick={onPaymentMethodChange('BDE')}
          color={eventSubscription?.payment_method === 'BDE' ? 'primary' : 'inherit'}
        >
          <Typography variant="caption">BDE</Typography>
        </Button>
      </Tooltip>

      <Tooltip title="Payer en liquide">
        <Button
          className="w-full"
          startIcon={<CashMultiple />}
          aria-label="Payer en liquide"
          variant={eventSubscription?.payment_method === 'CASH' ? 'contained' : 'outlined'}
          onClick={onPaymentMethodChange('CASH')}
          color={eventSubscription?.payment_method === 'CASH' ? 'primary' : 'inherit'}
        >
          <Typography variant="caption">LIQUIDE</Typography>
        </Button>
      </Tooltip>
    </ButtonGroup>
  )
}
