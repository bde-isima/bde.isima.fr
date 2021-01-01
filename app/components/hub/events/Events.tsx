import { useQuery, Image } from "blitz"
import Grid from "@material-ui/core/Grid"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"

import Card from "app/components/hub/events/Card"
import getEvents from "app/entities/events/queries/getEvents"

export default function Events() {
  const [{ events }, { isFetching }] = useQuery(getEvents, {
    include: { club: true },
    orderBy: { takes_place_at: 'asc' },
  })

  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="right">
        Évènements à venir
      </Typography>

      <Divider className="m-4" />

      {!isFetching && events.length === 0 && (
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/static/images/illustrations/NoData.svg"
            height="auto"
            width="300"
            alt="Aucune donnée"
          />

          <Typography variant="subtitle2" gutterBottom>
            Aucun événement à venir !
          </Typography>
        </div>
      )}

      <Grid container justifyContent="flex-start">
        {events.map((x) => (
          <Card key={x.id} event={x} isLoading={isFetching} />
        ))}
      </Grid>
    </div>
  )
}
