import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import Skeleton from "@material-ui/core/Skeleton"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import { EventSubscriptionWithTypedCart, CartItem } from "types"

export default function SubscriptionRecap({ result: [data, { isFetching }] }) {
  const getRecap = () => {
    const recap: CartItem[] = []
    data.eventSubscriptions.forEach((sub: EventSubscriptionWithTypedCart) => {
      sub.cart.forEach((item: CartItem) => {
        const exist = recap.find((exist) => {
          const hasSameName = exist.name === item.name
          const hasIdenticalOptions = exist.options.some(
            (o) => item.options.findIndex((y) => y.name === o.name) !== -1
          )
          return hasSameName && hasIdenticalOptions
        })
        if (exist) {
          exist.quantity = exist.quantity + item.quantity
        } else {
          recap.push({ ...item })
        }
      })
    })
    return recap
  }

  return (
    <div className="flex flex-col">
      <Typography variant="h6" align="center">
        Récapitulatif de l'événement
      </Typography>

      <Divider className="m-4" />

      <List>
        {(isFetching ? [...Array(6).keys()] : (getRecap() as any)).map((cartItem, idx) =>
          isFetching ? (
            <Skeleton animation="wave" variant="rectangular" height="48" />
          ) : (
            <ListItem key={idx} dense>
              <ListItemIcon>
                <Typography variant="overline">x{cartItem.quantity}</Typography>
              </ListItemIcon>

              <ListItemText
                primary={cartItem.name}
                secondary={cartItem.options.map((x) => x.name).join(", ")}
              />
            </ListItem>
          )
        )}
      </List>
    </div>
  )
}
