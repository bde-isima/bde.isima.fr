import Tooltip from '@mui/material/Tooltip'

import Check from '@mui/icons-material/CheckTwoTone'
import History from '@mui/icons-material/HistoryTwoTone'
import DoneAll from '@mui/icons-material/DoneAllTwoTone'
import HourglassTop from '@mui/icons-material/HourglassTopTwoTone'

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
        {event.status === 'WAITING_APPROVAL' && <HourglassTop className="text-yellow-500" />}

        {event.status === 'ACCEPTED' &&
          (new Date() < new Date(event.subscriptions_end_at) ? (
            <History className="text-blue-500" />
          ) : (
            <Check className="text-green-400" />
          ))}

        {event.status === 'CHECKED_OUT' && <DoneAll className="text-green-400" />}
      </span>
    </Tooltip>
  )
}
