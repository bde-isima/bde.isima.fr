import Image from "next/image"
import addDays from "date-fns/addDays"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Paper from "@material-ui/core/Paper"
import { useQuery, useSession } from "blitz"
import { parseISO, isSameDay } from "date-fns"
import Tooltip from "@material-ui/core/Tooltip"
import Divider from "@material-ui/core/Divider"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import Check from "mdi-material-ui/Check"
import DotsVertical from "mdi-material-ui/DotsVertical"

import { useCustomRouter } from "app/hooks/useCustomRouter"
import getEventSubscriptions from "app/entities/eventSubscriptions/queries/getEventSubscriptions"

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function Upcoming() {
  const session = useSession()
  const { pushRoute } = useCustomRouter()

  const [data, { isFetching }] = useQuery(
    getEventSubscriptions,
    {
      where: {
        userId: session?.userId,
        event: {
          AND: [{ takes_place_at: { gte: today } }, { takes_place_at: { lte: addDays(today, 7) } }],
        },
      },
      include: { event: { include: { club: true } } },
    },
    { suspense: false }
  )

  const getNextSevenDays = () => [...Array(7).keys()].map((i) => addDays(today, i))

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

              {isFetching && <Skeleton height="40" width="60%" />}

              {data &&
                data.eventSubscriptions.map((sub: any, subIdx) => {
                  return (
                    isSameDay(parseISO(date.toISOString()), parseISO(sub.event.takes_place_at)) && (
                      <Grid key={subIdx} item container xs={12} justifyContent="center">
                        <Chip
                          className="my-1"
                          label={
                            <Tooltip title={sub.event.name}>
                              <Typography className="w-10 md:w-24" noWrap>
                                {sub.event.name.substring(0, 10)}
                              </Typography>
                            </Tooltip>
                          }
                          color="default"
                          variant="outlined"
                          deleteIcon={
                            <Tooltip title="Tu es bien inscrit">
                              <Check />
                            </Tooltip>
                          }
                          onDelete={() => undefined}
                          avatar={
                            <Image
                              className="rounded-full"
                              src={sub.event.club.image}
                              width={40}
                              height={40}
                              alt={`Logo ${sub.event.club.name}`}
                            />
                          }
                          onClick={pushRoute(`/hub/events/${sub.event.id}`)}
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
