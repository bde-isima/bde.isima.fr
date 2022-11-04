import { Grid } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import Image from 'next/image';

import { useEventSubscription } from './subscription/EventSubscription';

export default function Header() {
  const { event } = useEventSubscription();

  return (
    <CardHeader
      classes={{
        root: 'flex flex-col lg:flex-row',
        avatar: 'mx-16 mb-4',
        content: 'w-full'
      }}
      avatar={
        event?.club?.image && (
          <Grid>
            <Image src={event?.club.image} width={100} height={100} alt={`Logo ${event?.club.name}`} />
            <Typography gutterBottom className="m-2 text-center">
              {event?.club.name.toUpperCase()}
            </Typography>
          </Grid>
        )
      }
      title={
        <>
          <Typography variant="h4" className="mb-4">
            {event.name}
          </Typography>
          {event.description && (
            <Typography gutterBottom className="mb-4">
              {event.description}
            </Typography>
          )}
        </>
      }
      subheader={
        <>
          <Typography variant="subtitle2">
            {format(event.takes_place_at, "'Se déroule le' EEEE d MMMM yyyy à HH:mm", { locale: fr })}
          </Typography>
          {event.subscriptions_end_at!.getTime() > Date.now() && event.subscriptions_end_at && (
            <Typography variant="subtitle2">
              {format(event.subscriptions_end_at, "'Inscription possible jusqu’au' EEEE d MMMM yyyy à HH:mm", {
                locale: fr
              })}
            </Typography>
          )}
          {event.subscriptions_end_at!.getTime() > Date.now() && event.max_subscribers && (
            <Typography variant="subtitle2">
              Jusqu’à {event.max_subscribers} place{event.max_subscribers > 1 && 's'}
            </Typography>
          )}
        </>
      }
    />
  );
}
