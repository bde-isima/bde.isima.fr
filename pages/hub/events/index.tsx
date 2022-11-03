import { Suspense } from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { BlitzPage, Routes } from '@blitzjs/next';

import Events from 'app/components/hub/events/Events';
import EventsItem from 'app/components/hub/events/EventsItem';
import getHubNav from 'app/components/nav/hub/getHubNav';

const EventsIndex: BlitzPage = () => {
  const FallbackComponent = [...Array(4).keys()].map((x) => <EventsItem key={x} isLoading />);

  return (
    <div className="flex flex-col">
      <Typography variant="h4" align="right" color="textPrimary" paragraph>
        Événements à venir
      </Typography>

      <Divider className="m-4" />

      <Grid container justifyContent="flex-start"></Grid>

      <Grid container justifyContent="flex-start">
        <Suspense fallback={FallbackComponent}>
          <Events />
        </Suspense>
      </Grid>
    </div>
  );
};

EventsIndex.suppressFirstRenderFlicker = true;
EventsIndex.authenticate = { redirectTo: Routes.Login() };
EventsIndex.getLayout = (page) => getHubNav(page, 'Events ZZ');

export default EventsIndex;
