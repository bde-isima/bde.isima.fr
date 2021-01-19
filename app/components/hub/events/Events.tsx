import Image from "next/image"
import { useQuery } from "blitz"
import addDays from "date-fns/addDays"
import Typography from "@material-ui/core/Typography"

import { Event as EventDb } from "db"
import EventsItem from "app/components/hub/events/EventsItem"
import getEvents from "app/entities/events/queries/getEvents"

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function Events() {
  const [{ events }] = useQuery(
    getEvents,
    {
      where: {
        AND: [{ takes_place_at: { gte: today } }, { takes_place_at: { lte: addDays(today, 7) } }],
      },
      orderBy: { takes_place_at: "asc" },
      include: { club: true },
    },
    { refetchOnWindowFocus: false }
  )

  return (
    <>
      {events.length === 0 && (
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

      {events.map((event, idx) => (
        <EventsItem key={idx} event={event as EventDb & { club: { image: string | null } }} />
      ))}
    </>
  )
}
