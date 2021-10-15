import { Image } from 'blitz'
import { format } from 'date-fns'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

import { useEventSubscription } from './subscription/EventSubscription'

export default function Header() {
  const { event } = useEventSubscription()

  return (
    <CardHeader
      classes={{
        root: 'flex flex-col lg:flex-row',
        avatar: 'mx-16 mb-4',
        content: 'w-full',
      }}
      avatar={
        event?.club?.image && (
          <Image
            className="rounded-full"
            src={event?.club.image}
            width={100}
            height={100}
            alt={`Logo ${event?.club.name}`}
          />
        )
      }
      title={
        <>
          <Typography color="textPrimary" gutterBottom>
            {event?.club.name.toUpperCase()}
          </Typography>
          <Typography color="textPrimary" variant="h6">
            {event.name}
          </Typography>
          {event.description && (
            <Typography color="textSecondary" gutterBottom>
              {event.description}
            </Typography>
          )}
        </>
      }
      subheader={
        <>
          <Typography variant="subtitle2">
            Date: {format(event.takes_place_at, 'dd/MM/yyyy à HH:mm')}
          </Typography>
          <Typography variant="subtitle2">
            Limite d&apos;inscription : {format(event.subscriptions_end_at, 'dd/MM/yyyy à HH:mm')}
          </Typography>
          {event.max_subscribers && (
            <Typography variant="subtitle2">Limite de places : {event.max_subscribers}</Typography>
          )}
        </>
      }
    />
  )
}
