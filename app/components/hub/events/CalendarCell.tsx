import { isSameDay } from "date-fns"
import Grid from "@material-ui/core/Grid"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"

import CalendarChip from "app/components/hub/events/CalendarChip"

type CalendarCellProps = {
  idx: number
  date: Date
  events?: any[]
  fallback?: boolean
}

export default function CalendarCell({
  idx,
  date,
  events = [],
  fallback = false,
}: CalendarCellProps) {
  return (
    <Grid
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
            .toUpperCase()} ${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`}
        </Typography>
      </Grid>

      {fallback ? (
        <Skeleton height="40" width="60%" />
      ) : (
        events.map(
          (event: any, eventIdx) =>
            isSameDay(date, event.takes_place_at) && <CalendarChip key={eventIdx} event={event} />
        )
      )}
    </Grid>
  )
}
