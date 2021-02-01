import Image from "next/image"
import Grid from "@material-ui/core/Grid"
import Chip from "@material-ui/core/Chip"
import Avatar from "@material-ui/core/Avatar"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"

import Check from "mdi-material-ui/Check"

import { useCustomRouter } from "app/hooks/useCustomRouter"

type CalendarCellProps = {
  event: any
}

export default function CalendarChip({ event }: CalendarCellProps) {
  const { pushRoute } = useCustomRouter()

  return (
    <Grid item container xs={12} justifyContent="center">
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
          event.EventSubscription.length > 0 ? (
            <Tooltip title="Tu es bien inscrit">
              <Check />
            </Tooltip>
          ) : undefined
        }
        onDelete={event.EventSubscription.length > 0 ? () => undefined : undefined}
        avatar={
          event?.club?.image ? (
            <Image
              className="rounded-full"
              src={event.club.image}
              width={40}
              height={40}
              alt={`Logo ${event.club.name}`}
            />
          ) : (
            <Avatar className="w-10 h-10" alt={`Logo ${event.club.name}`} />
          )
        }
        onClick={pushRoute(`/hub/events/${event.id}`)}
      />
    </Grid>
  )
}
