import { format } from "date-fns"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import MuiCard from "@material-ui/core/Card"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"

import { useCustomRouter } from "app/hooks/useCustomRouter"

export default function Card({ event }) {
  const { pushRoute } = useCustomRouter()

  return (
    <Grid container item justifyContent="center" xs={12} md={6} lg={3}>
      <MuiCard className="flex flex-col w-full m-2">
        <CardHeader
          classes={{ content: "overflow-hidden" }}
          avatar={
            <Avatar className="mx-2" src={event.club?.image ?? undefined} alt="Club organisateur" />
          }
          title={event.name}
          titleTypographyProps={{ variant: "subtitle2", noWrap: true }}
          subheader={event.description}
          subheaderTypographyProps={{ variant: "caption", noWrap: true }}
        />
        <CardActions className="px-4" disableSpacing>
          <Grid container>
            <Grid
              container
              item
              xs={8}
              justifyContent="center"
              alignContent="flex-start"
              direction="column"
            >
              <Chip
                className="rounded-lg mb-2 w-11/12"
                label={format(event.takes_place_at, "dd/MM/yyyy - hh:mm")}
                size="small"
              />
              <Chip
                className="rounded-lg mb-2 w-11/12"
                variant="outlined"
                label={format(event.subscriptions_end_at, "dd/MM/yyyy - hh:mm")}
                size="small"
              />
            </Grid>

            <Grid container item xs={4} justifyContent="flex-end" alignContent="center">
              <Button
                onClick={pushRoute(`/hub/events/${event.id}`)}
                variant="contained"
                size="small"
              >
                Voir
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </MuiCard>
    </Grid>
  )
}
