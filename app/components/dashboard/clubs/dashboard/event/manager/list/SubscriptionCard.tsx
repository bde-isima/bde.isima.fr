import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import MuiCard from '@mui/material/Card'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'

import DotsVertical from 'mdi-material-ui/DotsVertical'

import { User } from 'db'
import { EventSubscriptionWithTypedCart, Option } from 'types'

type CardProps = {
  subscription: any
  onMenuClick: (target, subscription) => void
}

export default function SubscriptionCard({ subscription, onMenuClick }: CardProps) {
  const onPopupMenu = (event) => {
    onMenuClick(event.currentTarget, subscription)
  }

  return (
    <Grid container item justifyContent="center" xs={12} md={4}>
      <MuiCard className="w-full h-full flex flex-col">
        <CardHeader
          className="items-start"
          classes={{ content: 'flex flex-col' }}
          title={`${subscription.user.firstname} ${subscription.user.lastname}`}
          titleTypographyProps={{ variant: 'subtitle2' }}
          subheader={`Paiement par ${subscription.payment_method}`}
          subheaderTypographyProps={{ variant: 'caption' }}
          action={
            <IconButton aria-label="Options" onClick={onPopupMenu} size="large">
              <DotsVertical />
            </IconButton>
          }
        />

        <List>
          {(subscription as EventSubscriptionWithTypedCart & { user: User }).cart.map(
            (cartItem, idx) => {
              const price =
                cartItem.quantity *
                (cartItem.price +
                  (cartItem.options?.reduce((acc: number, o: Option) => acc + o.price, 0) || 0))
              return (
                <ListItem key={idx} dense>
                  <ListItemIcon>
                    <Typography variant="overline">x{cartItem.quantity}</Typography>
                  </ListItemIcon>

                  <ListItemText
                    primary={cartItem.name}
                    secondary={cartItem.options?.map((x) => x.name).join(', ')}
                  />

                  <ListItemSecondaryAction>
                    <ListItemText primary={`${price} €`} />
                  </ListItemSecondaryAction>
                </ListItem>
              )
            }
          )}
        </List>
      </MuiCard>
    </Grid>
  );
}
