import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import { useQuery, useSession } from "blitz"
import Avatar from "@material-ui/core/Avatar"
import { parseISO, isSameDay } from "date-fns"
import Tooltip from "@material-ui/core/Tooltip"
import Divider from "@material-ui/core/Divider"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import Check from "mdi-material-ui/Check"
import DotsVertical from "mdi-material-ui/DotsVertical"

import { useCustomRouter } from "app/hooks/useCustomRouter"
import getEvents from "app/entities/events/queries/getEvents"
import getEventSubscriptions from "app/entities/eventSubscriptions/queries/getEventSubscriptions"

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function Upcoming() {
  const { pushRoute } = useCustomRouter()
  const session = useSession()

  const [results, { isFetching }] = useQuery(
    getEvents,
    {
      where: {
        AND: [
          { takes_place_at: { gte: today } },
          { takes_place_at: { lte: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7) } },
        ],
      },
      include: { club: true },
    },
    { suspense: false }
  )

  const [subResults, { isFetching: isFetchingSub }] = useQuery(
    getEventSubscriptions,
    {
      where: {
        userId: session.userId,
        eventId: { in: results ? results.events.map((x) => x.id) : [] },
      },
    },
    { suspense: false, enabled: !session.isLoading && results }
  )

  const getNextSevenDays = () =>
    [...Array(7).keys()].map((i) => new Date(new Date().setDate(today.getDate() + i)))

  return (
    <div className="flex flex-col">
      <Typography align="left" variant="h6">
        Évènements à venir
      </Typography>

      <Divider className="m-4" />

      <Paper square>
        <Grid container>
          {getNextSevenDays().map((date, idx) => (
            <Grid
              key={idx}
              className="p-2 min-h-100 border border-gray-300"
              item
              container
              xs={6}
              md={idx < 4 ? 3 : 4}
              justifyContent="center"
              alignContent="flex-start"
            >
              <Grid item container xs={12} justifyContent="center">
                <Typography variant="subtitle1" align="center" gutterBottom>
                  {`${date
                    .toLocaleString("fr-FR", { weekday: "short" })
                    .toUpperCase()} ${date.getDate().toString().padStart(2, "0")}/${(
                    date.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}`}
                </Typography>
              </Grid>

              {(isFetching || isFetchingSub) && <Skeleton height="40" width="60%" />}

              {!isFetching &&
                !isFetchingSub &&
                results &&
                subResults &&
                results.events.map((event: any, eventIdx) => {
                  const hasASubToThisEvent = subResults.eventSubscriptions.some(
                    (x) => x.eventId === event.id
                  )
                  return (
                    isSameDay(parseISO(date.toISOString()), event.takes_place_at) && (
                      <Grid key={eventIdx} item container xs={12} justifyContent="center">
                        <Chip
                          className="my-1"
                          label={
                            <Tooltip title={event.name}>
                              <Typography className="w-10 md:w-24" noWrap>
                                {event.name.substring(0, 10)}
                              </Typography>
                            </Tooltip>
                          }
                          color="default"
                          variant="outlined"
                          deleteIcon={
                            hasASubToThisEvent ? (
                              <Tooltip title="Tu es bien inscrit">
                                <Check />
                              </Tooltip>
                            ) : undefined
                          }
                          onDelete={hasASubToThisEvent ? () => undefined : undefined}
                          avatar={<Avatar src={event.club.image} alt={`Logo ${event.club.name}`} />}
                          onClick={pushRoute(`/hub/events/${event.id}`)}
                        />
                      </Grid>
                    )
                  )
                })}
            </Grid>
          ))}
        </Grid>
      </Paper>

      <div className="flex items-center mt-4">
        <Tooltip title="Plus">
          <IconButton
            className="mr-2"
            aria-label="Voir plus d'événements"
            onClick={pushRoute("/hub/events")}
          >
            <DotsVertical />
          </IconButton>
        </Tooltip>
        Tous les évènements
      </div>
    </div>
  )
}
