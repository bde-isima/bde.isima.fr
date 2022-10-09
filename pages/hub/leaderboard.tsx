import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { BlitzPage, Routes } from '@blitzjs/next';

import RecordsTable from 'app/components/hub/leaderboard/RecordsTable';
import getHubNav from 'app/components/nav/hub/getHubNav';

const Leaderboard: BlitzPage = () => {
  return (
    <div className="flex flex-col">
      <Typography variant="h4" paragraph align="left" color="textPrimary">
        Classement
      </Typography>

      <Typography variant="caption" color="textSecondary">
        Le classement est mis à jour chaque heure
      </Typography>

      <Divider className="m-4" />

      <RecordsTable />
    </div>
  );
};

Leaderboard.suppressFirstRenderFlicker = true;
Leaderboard.authenticate = { redirectTo: Routes.Login() };
Leaderboard.getLayout = (page) => getHubNav(page, 'Classement ZZ');

export default Leaderboard;
