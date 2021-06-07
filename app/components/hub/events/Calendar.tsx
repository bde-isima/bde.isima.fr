import addDays from 'date-fns/addDays'
import { useQuery, useAuthenticatedSession } from 'blitz'

import getEvents from 'app/entities/events/queries/getEvents'
import CalendarCell from 'app/components/hub/events/CalendarCell'

const today = new Date(new Date().setHours(0, 0, 0, 0))

export default function Calendar() {
  const session = useAuthenticatedSession()

  const [{ events }] = useQuery(getEvents, {
    where: {
      AND: [{ takes_place_at: { gte: today } }, { takes_place_at: { lte: addDays(today, 7) } }],
    },
    include: { club: true, EventSubscription: { where: { userId: session?.userId } } },
  })

  const getNextSevenDays = () => [...Array(7).keys()].map((i) => addDays(today, i))

  return (
    <>
      {getNextSevenDays().map((date, dateIdx) => (
        <CalendarCell key={dateIdx} idx={dateIdx} date={date} events={events} />
      ))}
    </>
  )
}
