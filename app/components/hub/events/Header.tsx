import { format } from "date-fns"
import Skeleton from "@material-ui/core/Skeleton"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"

import Avatar from "@material-ui/core/Avatar"
import AutoSkeleton from "app/utils/AutoSkeleton"

export default function Header({ event, isFetching }) {
  return (
    <CardHeader
      classes={{
        root: "flex flex-col lg:flex-row",
        avatar: "mx-16 mb-4",
        content: "w-full",
      }}
      avatar={
        <AutoSkeleton loading={isFetching}>
          <Avatar className="w-24 h-24" src={event?.club.image} alt={`Logo ${event?.club.name}`} />
        </AutoSkeleton>
      }
      title={
        <>
          <Typography gutterBottom>
            {isFetching ? (
              <Skeleton animation="wave" width="40%" />
            ) : (
              event?.club.name.toUpperCase()
            )}
          </Typography>
          <Typography variant="h6">
            {isFetching ? <Skeleton animation="wave" width="80%" /> : event.name}
          </Typography>
          {(isFetching || event.description) && (
            <Typography color="textSecondary" gutterBottom>
              {isFetching ? <Skeleton animation="wave" width="100%" /> : event.description}
            </Typography>
          )}
        </>
      }
      subheader={
        <>
          <Typography variant="subtitle2">
            {isFetching ? (
              <Skeleton animation="wave" width="80%" />
            ) : (
              `Date: ${format(event.takes_place_at, "dd/MM/yyyy à HH:mm")}`
            )}
          </Typography>
          <Typography variant="subtitle2">
            {isFetching ? (
              <Skeleton animation="wave" width="80%" />
            ) : (
              `Limite d'inscription : ${format(event.subscriptions_end_at, "dd/MM/yyyy à HH:mm")}`
            )}
          </Typography>
        </>
      }
    />
  )
}
