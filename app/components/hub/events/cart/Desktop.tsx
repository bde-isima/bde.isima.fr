import Card from "@material-ui/core/Card"
import List from "@material-ui/core/List"
import Grow from "@material-ui/core/Grow"
import Button from "@material-ui/core/Button"
import Hidden from "@material-ui/core/Hidden"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import Skeleton from "@material-ui/core/Skeleton"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import CircularProgress from "@material-ui/core/CircularProgress"

import Close from "mdi-material-ui/Close"
import Check from "mdi-material-ui/Check"
import PlusCircleOutline from "mdi-material-ui/PlusCircleOutline"
import MinusCircleOutline from "mdi-material-ui/MinusCircleOutline"

import { Event } from "db"
import { CartItem, Option } from "types"
import PaymentMethods from "./PaymentMethods"
import { useEventSubscription } from "app/components/hub/events/subscription/EventSubscription"

type DesktopProps = {
  event: Event
  total: number
  subscribing: boolean
  onSubscribe: () => void
  unsubscribing: boolean
  onUnsubscribe: () => void
  onQuantityChange: (cartItem: CartItem, value: number) => () => void
}

export default function Desktop({
  event,
  total,
  subscribing,
  onSubscribe,
  unsubscribing,
  onUnsubscribe,
  onQuantityChange,
}: DesktopProps) {
  const { eventSubscription, isFetching } = useEventSubscription()

  return (
    <Hidden mdDown>
      <Card className="w-11/12 mt-4">
        <CardActions className="p-0">
          <ButtonGroup className="w-full" aria-label="Inscription/Désinscription">
            {eventSubscription?.id && (
              <Button
                className="w-full h-12"
                startIcon={<Close />}
                aria-label="Se désinscrire"
                color="inherit"
                onClick={onUnsubscribe}
                disabled={unsubscribing || subscribing}
              >
                {unsubscribing ? <CircularProgress size={25} color="primary" /> : "Se désinscrire"}
              </Button>
            )}
            <Button
              className="w-full h-12"
              startIcon={<Check />}
              variant="contained"
              aria-label={eventSubscription?.id ? "Modifier" : "S'inscrire"}
              onClick={onSubscribe}
              disabled={subscribing || unsubscribing}
            >
              {subscribing ? (
                <CircularProgress size={25} color="secondary" />
              ) : eventSubscription?.id ? (
                "Modifier"
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
                (cartItem.price +
                  (cartItem.options?.reduce((acc: number, o: Option) => acc + o.price, 0) || 0))
              return (
                <Grow key={idx} in={!isFetching}>
                  <ListItem dense disableGutters>
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
                      className="text-right m-4"
                      primary={cartItem.name}
                      secondary={cartItem.options?.map((o) => o.name).join(", ")}
                    />

                    <ListItemText className="text-right m-4" primary={`${price.toFixed(2)} €`} />
                  </ListItem>
                </Grow>
              )
            })}

            <Divider />

            <ListItem>
              <ListItemText primary="Total" />
              <ListItemText className="text-right m-4">
                {isFetching ? <Skeleton animation="wave" width="100%" /> : `${total.toFixed(2)} €`}
              </ListItemText>
            </ListItem>

            <ListItem dense>
              <ListItemText secondary="Le prélèvement n'est pas immédiat." />
            </ListItem>
          </List>
        </CardContent>

        <CardActions>{event.products.length > 0 && <PaymentMethods />}</CardActions>
      </Card>
    </Hidden>
  )
}
