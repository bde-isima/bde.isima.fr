import Tooltip from '@mui/material/Tooltip'

import Check from 'mdi-material-ui/Check'
import History from 'mdi-material-ui/History'
import CheckAll from 'mdi-material-ui/CheckAll'
import TimerSand from 'mdi-material-ui/TimerSand'

const titles = {
  WAITING_APPROVAL: ['En attente de validation par le BDE'],
  ACCEPTED: ['Clotûré et encaissable', 'Inscriptions ouvertes'],
  CHECKED_OUT: ['Terminé'],
}

export default function EventStatus({ event }) {
  const title =
    titles[event.status][
      event.status === 'ACCEPTED' ? +(new Date() < new Date(event.subscriptions_end_at)) : 0
    ]

  return (
    <Tooltip title={title}>
      <span>
        {event.status === 'WAITING_APPROVAL' && <TimerSand className="text-yellow-500" />}

        {event.status === 'ACCEPTED' &&
          (new Date() < new Date(event.subscriptions_end_at) ? (
            <History className="text-blue-500" />
          ) : (
            <Check className="text-green-400" />
          ))}

        {event.status === 'CHECKED_OUT' && <CheckAll className="text-green-400" />}
      </span>
    </Tooltip>
  )
}
