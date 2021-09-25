import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import PageTitle from 'app/core/layouts/PageTitle'
import Events from 'app/components/hub/events/Events'
import EventsItem from 'app/components/hub/events/EventsItem'

export default function EventsIndex() {
  const FallbackComponent = [...Array(4).keys()].map((x) => <EventsItem key={x} isLoading />)

  return (
    <>
      <PageTitle title="Events ZZ" />

      <div className="flex flex-col">
        <Typography variant="h4" align="right" color="textPrimary" paragraph>
          Évènements à venir
        </Typography>

        <Divider className="m-4" />

        <Grid container justifyContent="flex-start"></Grid>

        <Grid container justifyContent="flex-start">
          <Suspense fallback={FallbackComponent}>
            <Events />
          </Suspense>
        </Grid>
      </div>
    </>
  )
}
