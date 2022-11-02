import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Event as EventDb } from 'db';

import Image from 'next/image';

import { useQuery } from '@blitzjs/rpc';

import EventsItem from 'app/components/hub/events/EventsItem';
import getEvents from 'app/entities/events/queries/getEvents';

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function Events() {
  const [{ events }] = useQuery(
    getEvents,
    {
      where: {
        AND: [{ subscriptions_end_at: { gte: today } }, { status: 'ACCEPTED' }]
      },
      orderBy: { takes_place_at: 'asc' },
      include: { club: true }
    },
    { refetchOnWindowFocus: false }
  );

  return (
    <>
      {events.length === 0 && (
        <Grid container item alignContent="center" direction="column">
          <Image src="/static/images/illustrations/NoData.svg" width={300} height={300} alt="Aucune donnée" />

          <Typography variant="h5" align="center" color="textPrimary" gutterBottom>
            Aucun événement à venir !
          </Typography>
        </Grid>
      )}

      {events.map((event, idx) => (
        <EventsItem key={idx} event={event as EventDb & { club: { image: string | null; name: string } }} />
      ))}
    </>
  );
}
