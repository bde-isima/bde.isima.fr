import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import Typography from "@material-ui/core/Typography"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"

import { EventSubscriptionWithTypedCart, CartItem } from "types"

type SubscriptionRecapProps = {
  eventSubscriptions: EventSubscriptionWithTypedCart[]
}

export default function SubscriptionRecap({ eventSubscriptions = [] }: SubscriptionRecapProps) {
  const getRecap = () => {
    const recap: CartItem[] = []

    ;(eventSubscriptions as any[]).forEach((sub: EventSubscriptionWithTypedCart) => {
      sub.cart.forEach((item: CartItem) => {
        const exist = recap.find((exist) => {
          //Sort the arrays so we have options name in the same order before joining
          exist.options?.sort((a, b) => a.name.localeCompare(b.name))
          item.options?.sort((a, b) => a.name.localeCompare(b.name))

          //Default to [] or we won't get comparable result for undefined arrays
          //Undefined would give undefined, whereas [] would give empty string
          const exitOptions = (exist.options || []).map((x) => x.name).join(", ")
          const itemOptions = (item.options || []).map((x) => x.name).join(", ")

          const hasSameName = exist.name === item.name
          const hasIdenticalOptions = exitOptions === itemOptions

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
        {(getRecap() as any).map((cartItem, idx) => (
          <ListItem key={idx} dense>
            <ListItemIcon>
              <Typography variant="overline">x{cartItem.quantity}</Typography>
            </ListItemIcon>

            <ListItemText
              primary={cartItem.name}
              secondary={cartItem.options?.map((x) => x.name).join(", ")}
            />
          </ListItem>
        ))}
      </List>
    </div>
  )
}
