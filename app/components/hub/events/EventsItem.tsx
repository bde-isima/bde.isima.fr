import Image from "next/image"
import { format } from "date-fns"
import Chip from "@material-ui/core/Chip"
import Grid from "@material-ui/core/Grid"
import MuiCard from "@material-ui/core/Card"
import Avatar from "@material-ui/core/Avatar"
import Button from "@material-ui/core/Button"
import Skeleton from "@material-ui/core/Skeleton"
import CardHeader from "@material-ui/core/CardHeader"
import CardActions from "@material-ui/core/CardActions"

import { Event } from "db"
import { useCustomRouter } from "app/hooks/useCustomRouter"

type EventsItemProps = {
  event?: Event & { club: { image: string | null } }
  isLoading?: boolean
}

export default function EventsItem({ event, isLoading }: EventsItemProps) {
  const { pushRoute } = useCustomRouter()

  return (
    <Grid container item justifyContent="center" xs={12} md={6} lg={3}>
      <MuiCard className="flex flex-col w-full m-2">
        <CardHeader
          classes={{ content: "overflow-hidden" }}
          avatar={
            isLoading ? (
              <Skeleton variant="circular" width={40} height={40} animation="wave" />
            ) : event?.club?.image ? (
              <Image
                className="rounded-full"
                src={event?.club.image}
                width={40}
                height={40}
                alt="Club organisateur"
              />
            ) : (
              <Avatar alt="Photo du club" />
            )
          }
          title={isLoading ? <Skeleton width="100%" animation="wave" /> : event?.name}
          titleTypographyProps={{ variant: "subtitle2", noWrap: true }}
          subheader={isLoading ? <Skeleton width="100%" animation="wave" /> : event?.description}
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
                label={!isLoading && format(event?.takes_place_at!, "dd/MM/yyyy - HH:mm")}
                size="small"
              />
              <Chip
                className="rounded-lg mb-2 w-11/12"
                variant="outlined"
                label={!isLoading && format(event?.subscriptions_end_at!, "dd/MM/yyyy - HH:mm")}
                size="small"
              />
            </Grid>

            <Grid container item xs={4} justifyContent="flex-end" alignContent="center">
              <Button
                onClick={pushRoute(`/hub/events/${event?.id}`)}
                variant="contained"
                size="small"
                disabled={isLoading}
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
