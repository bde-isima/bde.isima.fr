import { useMemo } from 'react';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { CartItem, EventSubscriptionWithTypedCart } from 'global';

import Image from 'next/image';

type SubscriptionRecapProps = {
  eventSubscriptions: EventSubscriptionWithTypedCart[];
};

export default function SubscriptionRecap({ eventSubscriptions = [] }: SubscriptionRecapProps) {
  const recap = useMemo(() => {
    const cartItems: CartItem[] = [];

    eventSubscriptions.forEach((sub: EventSubscriptionWithTypedCart) => {
      sub.cart.forEach((item: CartItem) => {
        const exist = cartItems.find((exist) => {
          //Sort the arrays so we have options name in the same order before joining
          exist.options?.sort((a, b) => a.name.localeCompare(b.name));
          item.options?.sort((a, b) => a.name.localeCompare(b.name));

          //Default to [] or we won't get comparable result for undefined arrays
          //Undefined would give undefined, whereas [] would give empty string
          const existOptions = (exist.options || []).map((x) => x.name).join(', ');
          const itemOptions = (item.options || []).map((x) => x.name).join(', ');

          const hasSameName = exist.name === item.name;
          const hasIdenticalOptions = existOptions === itemOptions;

          return hasSameName && hasIdenticalOptions;
        });

        if (exist) {
          exist.quantity = exist.quantity + item.quantity;
        } else {
          cartItems.push({ ...item });
        }
      });
    });
    return cartItems;
  }, [eventSubscriptions]);

  return (
    <div className="flex flex-col">
      <Typography variant="h6" align="center">
        Récapitulatif de l&apos;événement
      </Typography>

      <Divider className="m-4" />

      <List>
        {recap.length === 0 && (
          <div className="flex flex-col justify-center items-center">
            <Image src="/static/images/illustrations/NoData.svg" width={300} height={300} alt="Aucune donnée" />
            <Typography variant="subtitle2" gutterBottom>
              Aucun récapitulatif pour l&apos;instant
            </Typography>
          </div>
        )}

        {recap.map((cartItem, idx) => (
          <ListItem key={idx} dense>
            <ListItemIcon>
              <Typography variant="overline">x{cartItem.quantity}</Typography>
            </ListItemIcon>

            <ListItemText primary={cartItem.name} secondary={cartItem.options?.map((x) => x.name).join(', ')} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
