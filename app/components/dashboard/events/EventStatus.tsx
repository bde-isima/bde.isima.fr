import Tooltip from '@mui/material/Tooltip';

import Check from '@mui/icons-material/CheckTwoTone';
import DoneAll from '@mui/icons-material/DoneAllTwoTone';
import History from '@mui/icons-material/HistoryTwoTone';
import HourglassTop from '@mui/icons-material/HourglassTopTwoTone';

const titles = {
  WAITING_APPROVAL: ['En attente de validation par le BDE'],
  ACCEPTED: ['Clotûré et encaissable', 'Inscriptions ouvertes'],
  CHECKED_OUT: ['Terminé']
};

export default function EventStatus({ event }) {
  const title =
    titles[event.status][event.status === 'ACCEPTED' ? +(new Date() < new Date(event.subscriptions_end_at)) : 0];

  return (
    <Tooltip title={title}>
      <span>
        {event.status === 'WAITING_APPROVAL' && <HourglassTop color="warning" />}

        {event.status === 'ACCEPTED' &&
          (new Date() < new Date(event.subscriptions_end_at) ? <History color="info" /> : <Check color="success" />)}

        {event.status === 'CHECKED_OUT' && <DoneAll color="success" />}
      </span>
    </Tooltip>
  );
}
