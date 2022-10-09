import { Suspense } from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import addDays from 'date-fns/addDays';

import MoreVert from '@mui/icons-material/MoreVertTwoTone';

import Calendar from 'app/components/hub/events/Calendar';
import CalendarCell from 'app/components/hub/events/CalendarCell';
import { useRouter } from 'app/core/lib/router';

const today = new Date(new Date().setHours(0, 0, 0, 0));

export default function Upcoming() {
  const { pushRoute } = useRouter();

  const getNextSevenDays = () => [...Array(7).keys()].map((i) => addDays(today, i));

  const FallbackComponent = getNextSevenDays().map((date, dateIdx) => (
    <CalendarCell key={dateIdx} idx={dateIdx} date={date} fallback />
  ));

  return (
    <div className="flex flex-col">
      <Typography align="left" variant="h6" color="textPrimary">
        Évènements à venir
      </Typography>

      <Divider className="m-4" />

      <Grid className="px-4" container>
        <Suspense fallback={FallbackComponent}>
          <Calendar />
        </Suspense>
      </Grid>

      <div className="flex items-center mt-4">
        <Tooltip title="Plus">
          <IconButton
            className="mr-2"
            aria-label="Voir plus d'événements"
            onClick={pushRoute('/hub/events')}
            size="large"
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
        <Typography color="textPrimary">Tous les évènements</Typography>
      </div>
    </div>
  );
}
