import { useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CartItem, Option } from 'global';

import AddCircle from '@mui/icons-material/AddCircleTwoTone';
import Check from '@mui/icons-material/CheckTwoTone';
import Close from '@mui/icons-material/CloseTwoTone';
import RemoveCircle from '@mui/icons-material/RemoveCircleTwoTone';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCartTwoTone';
import ShoppingCart from '@mui/icons-material/ShoppingCartTwoTone';

import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription';
import SlideTransition from 'app/core/layouts/SlideTransition';

import PaymentMethods from './PaymentMethods';

type MobileProps = {
  total: number;
  subscribing: boolean;
  onSubscribe: () => void;
  unsubscribing: boolean;
  onUnsubscribe: () => void;
  onQuantityChange: (cartItem: CartItem, value: number) => () => void;
};

export default function Mobile({
  total,
  subscribing,
  onSubscribe,
  unsubscribing,
  onUnsubscribe,
  onQuantityChange
}: MobileProps) {
  const [open, setOpen] = useState(false);
  const { event, eventSubscription } = useEventSubscription();

  const handleOpenChange = (value) => () => setOpen(value);

  return (
    <AppBar
      position="fixed"
      color="inherit"
      className="top-auto bottom-0"
      style={{ zIndex: open ? 1400 : 1100 }}
      sx={{ display: { md: 'none', xs: 'block' } }}
    >
      <Toolbar>
        <Grid className="m-2" container spacing={1}>
          <Grid item xs={9}>
            {open ? (
              <Button
                className="w-full h-full"
                startIcon={<Check />}
                variant="contained"
                onClick={onSubscribe}
                disabled={unsubscribing || subscribing}
                aria-label={eventSubscription.id ? 'Modifier' : "S'inscrire"}
                color="primary"
              >
                {subscribing ? (
                  <CircularProgress size={25} color="secondary" />
                ) : eventSubscription.id ? (
                  'Modifier'
                ) : (
                  "S'inscrire"
                )}
              </Button>
            ) : (
              <Button
                className="w-full h-full"
                startIcon={<ShoppingCart />}
                variant="contained"
                aria-label="Voir mon panier"
                color="primary"
                onClick={handleOpenChange(true)}
              >
                Voir mon panier
              </Button>
            )}
          </Grid>
          <Grid container item xs={3} justifyContent="center" alignContent="center">
            <Typography className="text-center" variant="caption" color="textSecondary">
              {`${total} €`}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>

      <Dialog
        open={open}
        fullScreen
        keepMounted
        onClose={handleOpenChange(false)}
        TransitionComponent={SlideTransition}
      >
        <DialogActions>
          <IconButton className="m-2" edge="end" onClick={handleOpenChange(false)} aria-label="Réduire" size="large">
            <Close />
          </IconButton>
        </DialogActions>

        <DialogContent>
          <Typography variant="h6" paragraph>
            Récapitulatif d&apos;inscription
          </Typography>

          <Divider className="m-2" />

          <List>
            {eventSubscription.cart.map((cartItem: CartItem, idx: number) => {
              const price =
                cartItem.quantity *
                (cartItem.price + (cartItem.options?.reduce((acc: number, o: Option) => acc + o.price, 0) || 0));
              return (
                <ListItem key={idx} dense>
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
                    className="text-center"
                    primary={cartItem.name}
                    secondary={cartItem.options?.map((o) => o.name).join(', ')}
                  />

                  <ListItemText className="text-right" primary={`${price.toFixed(2)} €`} />
                </ListItem>
              );
            })}

            {event.products.length > 0 && eventSubscription.cart.length === 0 && (
              <ListItem>
                <ListItemIcon>
                  <RemoveShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Votre panier est vide !" />
              </ListItem>
            )}

            <Divider className="m-2" />

            <ListItem>
              <ListItemText primary="Total" />
              <ListItemText className="text-center" primary={`${total.toFixed(2)} €`} />
            </ListItem>

            <Divider className="m-2" />

            <ListItem>
              <ListItemText primary="Moyen de paiement" secondary="Le prélèvement n'est pas immédiat." />
            </ListItem>

            <ListItem>{event.products.length > 0 && <PaymentMethods />}</ListItem>

            {eventSubscription.id && (
              <div className="flex flex-col justify-center items-center p-3">
                <Typography variant="body2" align="center" color="textSecondary" paragraph>
                  T&apos;étais pas là pour être ici ?
                </Typography>

                <Button
                  className="w-full text-red-600"
                  startIcon={<Close />}
                  variant="outlined"
                  onClick={onUnsubscribe}
                  disabled={unsubscribing || subscribing}
                  aria-label="Se désinscrire"
                  color="inherit"
                >
                  {unsubscribing ? <CircularProgress size={25} color="inherit" /> : 'Se désinscrire'}
                </Button>
              </div>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}
