import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { CartItem, Option } from 'global';

import AddCircle from '@mui/icons-material/AddCircleTwoTone';
import Check from '@mui/icons-material/CheckTwoTone';
import Close from '@mui/icons-material/CloseTwoTone';
import RemoveCircle from '@mui/icons-material/RemoveCircleTwoTone';

import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription';

import PaymentMethods from './PaymentMethods';

type DesktopProps = {
  total: number;
  subscribing: boolean;
  onSubscribe: () => void;
  unsubscribing: boolean;
  onUnsubscribe: () => void;
  onQuantityChange: (cartItem: CartItem, value: number) => () => void;
};

export default function Desktop({
  total,
  subscribing,
  onSubscribe,
  unsubscribing,
  onUnsubscribe,
  onQuantityChange
}: DesktopProps) {
  const { event, eventSubscription } = useEventSubscription();

  return (
    <div className="w-11/12 mt-4 hidden md:block">
      <CardActions className="p-0">
        <ButtonGroup className="w-full" aria-label="Inscription/Désinscription">
          {eventSubscription?.id && (
            <Button
              className="w-full h-12"
              startIcon={<Close />}
              aria-label="Se désinscrire"
              color="neutral"
              onClick={onUnsubscribe}
              disabled={unsubscribing || subscribing}
            >
              {unsubscribing ? <CircularProgress size={25} color="primary" /> : 'Se désinscrire'}
            </Button>
          )}
          <Button
            className="w-full h-12"
            startIcon={event.subscriptions_end_at!.getTime() > Date.now() && <Check />}
            variant="contained"
            aria-label={eventSubscription?.id ? 'Modifier' : "S'inscrire"}
            onClick={onSubscribe}
            disabled={subscribing || unsubscribing || event.subscriptions_end_at!.getTime() <= Date.now()}
          >
            {subscribing ? (
              <CircularProgress size={25} color="neutral" />
            ) : eventSubscription?.id ? (
              'Modifier'
            ) : event.subscriptions_end_at!.getTime() <= Date.now() ? (
              'Les inscriptions sont closes'
            ) : (
              "S'inscrire"
            )}
          </Button>
        </ButtonGroup>
      </CardActions>

      <CardContent>
        <List>
          {eventSubscription?.cart.map((cartItem: CartItem, idx: number) => {
            const price =
              cartItem.quantity *
              (cartItem.price + (cartItem.options?.reduce((acc: number, o: Option) => acc + o.price, 0) || 0));
            return (
              <Grow key={idx} in>
                <ListItem dense disableGutters>
                  <ListItemIcon>
                    <div className="flex items-center">
                      <IconButton
                        onClick={onQuantityChange(cartItem, -1)}
                        aria-label={`Supprimer 1 ${cartItem.name}`}
                        size="large"
                      >
                        <RemoveCircle />
                      </IconButton>
                      <Typography variant="overline">{cartItem.quantity}</Typography>
                      <IconButton
                        onClick={onQuantityChange(cartItem, 1)}
                        aria-label={`Ajouter 1 ${cartItem.name}`}
                        size="large"
                      >
                        <AddCircle />
                      </IconButton>
                    </div>
                  </ListItemIcon>

                  <ListItemText
                    className="text-right m-4"
                    primary={cartItem.name}
                    secondary={cartItem.options?.map((o) => o.name).join(', ')}
                  />

                  <ListItemText className="text-right m-4" primary={`${price.toFixed(2)} €`} />
                </ListItem>
              </Grow>
            );
          })}

          <Divider />

          <ListItem>
            <ListItemText primary="Total" />
            <ListItemText className="text-right m-4">{`${total.toFixed(2)} €`}</ListItemText>
          </ListItem>

          <ListItem dense>
            <ListItemText secondary="Le prélèvement n'est pas immédiat." />
          </ListItem>
        </List>
      </CardContent>

      <CardActions>{event.products.length > 0 && <PaymentMethods />}</CardActions>
    </div>
  );
}
