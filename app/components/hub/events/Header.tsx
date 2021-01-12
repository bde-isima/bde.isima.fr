import Image from "next/image"
import { format } from "date-fns"
import Skeleton from "@material-ui/core/Skeleton"
import CardHeader from "@material-ui/core/CardHeader"
import Typography from "@material-ui/core/Typography"

export default function Header({ event, isFetching }) {
  return (
    <CardHeader
      classes={{
        root: "flex flex-col lg:flex-row",
        avatar: "mx-16 mb-4",
        content: "w-full",
      }}
      avatar={
        event?.club?.image && (
          <Image
            className="rounded-full"
            src={event?.club.image}
            width={100}
            height={100}
            alt={`Logo ${event?.club.name}`}
          />
        )
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
