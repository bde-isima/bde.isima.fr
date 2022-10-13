import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CartItem, EventSubscriptionWithTypedCart, Option } from 'global';

type SubscriptionsAnalyticsProps = {
  eventSubscriptions: EventSubscriptionWithTypedCart[];
};

export default function SubscriptionsAnalytics({ eventSubscriptions = [] }: SubscriptionsAnalyticsProps) {
  const revenues = (eventSubscriptions as any).reduce((acc, sub) => {
    return (
      acc +
      sub.cart.reduce((acc: number, cartItem: CartItem) => {
        return (
          acc +
          cartItem.quantity *
            (cartItem.price +
              (cartItem.options?.reduce((acc: number, o: Option) => {
                return acc + o.price;
              }, 0) || 0))
        );
      }, 0)
    );
  }, 0);

  return (
    <div className="flex flex-col">
      <Typography variant="h6" align="center">
        Statistiques de l&apos;événement
      </Typography>

      <Divider className="m-4" />

      <div className="flex justify-around">
        <Card className="flex flex-col m-2 p-4">
          <Typography variant="subtitle1" color="textSecondary">
            Audience engagée
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            {`${eventSubscriptions.length} inscrit(s)`}
          </Typography>
        </Card>

        <Card className="flex flex-col m-2 p-4">
          <Typography variant="subtitle1" color="textSecondary">
            Recettes actuelles
          </Typography>
          <Typography variant="h6" color="inherit" gutterBottom>
            {`${revenues.toFixed(2)} €`}
          </Typography>
        </Card>
      </div>
    </div>
  );
}
