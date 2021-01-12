import Card from "@material-ui/core/Card"
import Divider from "@material-ui/core/Divider"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"

import { Option, EventSubscriptionWithTypedCart, CartItem } from "types"

export default function SubscriptionsAnalytics({ result: [data, { isFetching }] }) {
  const revenues = data.eventSubscriptions.reduce((acc, sub: EventSubscriptionWithTypedCart) => {
    return (
      acc +
      sub.cart.reduce((acc: number, cartItem: CartItem) => {
        return (
          acc +
          cartItem.quantity *
            (cartItem.price +
              cartItem.options.reduce((acc: number, o: Option) => {
                return acc + o.price
              }, 0))
        )
      }, 0)
    )
  }, 0)

  return (
    <div className="flex flex-col">
      <Typography variant="h6" align="center">
        Statistiques de l'événement
      </Typography>

      <Divider className="m-4" />

      <div className="flex justify-around">
        <Card className="flex flex-col m-2 p-4">
          <Typography variant="subtitle1" color="textSecondary">
            Audience engagée
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            {isFetching ? (
              <Skeleton animation="wave" width="20%" />
            ) : (
              `${data.eventSubscriptions.length} inscrit(s)`
            )}
          </Typography>
        </Card>

        <Card className="flex flex-col m-2 p-4">
          <Typography variant="subtitle1" color="textSecondary">
            Recettes actuelles
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            {isFetching ? <Skeleton animation="wave" width="20%" /> : `${revenues.toFixed(2)} €`}
          </Typography>
        </Card>
      </div>
    </div>
  )
}
