import { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Dialog from '@material-ui/core/Dialog'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DialogActions from '@material-ui/core/DialogActions'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'

import Check from 'mdi-material-ui/Check'
import Close from 'mdi-material-ui/Close'
import CloseIcon from 'mdi-material-ui/Close'
import CartOff from 'mdi-material-ui/CartOff'
import CartOutline from 'mdi-material-ui/CartOutline'
import PlusCircleOutline from 'mdi-material-ui/PlusCircleOutline'
import MinusCircleOutline from 'mdi-material-ui/MinusCircleOutline'

import { CartItem, Option } from 'types'
import PaymentMethods from './PaymentMethods'
import SlideTransition from 'app/core/layouts/SlideTransition'
import { useEventSubscription } from 'app/components/hub/events/subscription/EventSubscription'

type MobileProps = {
  total: number
  subscribing: boolean
  onSubscribe: () => void
  unsubscribing: boolean
  onUnsubscribe: () => void
  onQuantityChange: (cartItem: CartItem, value: number) => () => void
}

export default function Mobile({
  total,
  subscribing,
  onSubscribe,
  unsubscribing,
  onUnsubscribe,
  onQuantityChange,
}: MobileProps) {
  const [open, setOpen] = useState(false)
  const { event, eventSubscription } = useEventSubscription()
  const hidden = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  const handleOpenChange = (value) => () => setOpen(value)

  return (
    !hidden && (
      <AppBar
        position="fixed"
        color="inherit"
        className="top-auto bottom-0"
        style={{ zIndex: open ? 1400 : 1100 }}
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
                  startIcon={<CartOutline />}
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
            <IconButton
              className="m-2"
              edge="end"
              onClick={handleOpenChange(false)}
              aria-label="Réduire"
            >
              <CloseIcon />
            </IconButton>
          </DialogActions>

          <DialogContent>
            <Typography variant="h6" paragraph>
              Récapitulatif d'inscription
            </Typography>

            <Divider className="m-2" />

            <List>
              {eventSubscription.cart.map((cartItem: CartItem, idx: number) => {
                const price =
                  cartItem.quantity *
                  (cartItem.price +
                    (cartItem.options?.reduce((acc: number, o: Option) => acc + o.price, 0) || 0))
                return (
                  <ListItem key={idx} dense>
                    <ListItemIcon>
                      <div className="flex items-center">
                        <IconButton
                          onClick={onQuantityChange(cartItem, -1)}
                          aria-label={`Supprimer 1 ${cartItem.name}`}
                        >
                          <MinusCircleOutline />
                        </IconButton>
                        <Typography variant="overline">{cartItem.quantity}</Typography>
                        <IconButton
                          onClick={onQuantityChange(cartItem, 1)}
                          aria-label={`Ajouter 1 ${cartItem.name}`}
                        >
                          <PlusCircleOutline />
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
                )
              })}

              {event.products.length > 0 && eventSubscription.cart.length === 0 && (
                <ListItem>
                  <ListItemIcon>
                    <CartOff />
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
                <ListItemText
                  primary="Moyen de paiement"
                  secondary="Le prélèvement n'est pas immédiat."
                />
              </ListItem>

              <ListItem>{event.products.length > 0 && <PaymentMethods />}</ListItem>

              {eventSubscription.id && (
                <div className="flex flex-col justify-center items-center p-3">
                  <Typography variant="body2" align="center" color="textSecondary" paragraph>
                    T'étais pas là pour être ici ?
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
                    {unsubscribing ? (
                      <CircularProgress size={25} color="inherit" />
                    ) : (
                      'Se désinscrire'
                    )}
                  </Button>
                </div>
              )}
            </List>
          </DialogContent>
        </Dialog>
      </AppBar>
    )
  )
}
