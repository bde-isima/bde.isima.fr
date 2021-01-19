import { Suspense } from "react"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import PageTitle from "app/layouts/PageTitle"
import Events from "app/components/hub/events/Events"
import EventsItem from "app/components/hub/events/EventsItem"

export default function EventsIndex() {
  const FallbackComponent = [...Array(4).keys()].map((x) => <EventsItem key={x} isLoading />)

  return (
    <>
      <PageTitle title="Events ZZ" />

      <div className="flex flex-col">
        <Typography variant="h4" paragraph align="right">
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
