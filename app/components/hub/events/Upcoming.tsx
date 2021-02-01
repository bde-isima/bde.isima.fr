import { Suspense } from "react"
import addDays from "date-fns/addDays"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Tooltip from "@material-ui/core/Tooltip"
import Divider from "@material-ui/core/Divider"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import DotsVertical from "mdi-material-ui/DotsVertical"

import Calendar from "app/components/hub/events/Calendar"
import { useCustomRouter } from "app/hooks/useCustomRouter"
import CalendarCell from "app/components/hub/events/CalendarCell"

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function Upcoming() {
  const { pushRoute } = useCustomRouter()

  const getNextSevenDays = () => [...Array(7).keys()].map((i) => addDays(today, i))

  const FallbackComponent = getNextSevenDays().map((date, dateIdx) => (
    <CalendarCell key={dateIdx} idx={dateIdx} date={date} fallback />
  ))

  return (
    <div className="flex flex-col mb-4">
      <Typography align="left" variant="h6" color="textPrimary">
        Évènements à venir
      </Typography>

      <Divider className="m-4" />

      <Paper square>
        <Grid container>
          <Suspense fallback={FallbackComponent}>
            <Calendar />
          </Suspense>
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
        <Typography color="textPrimary">Tous les évènements</Typography>
      </div>
    </div>
  )
}
