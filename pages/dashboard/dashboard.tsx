import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';

const Dashboard: BlitzPage = () => {
  return (
    <div className="flex flex-col place-self-center items-center">

      <Typography variant="h2" paragraph>
        Dashboard
      </Typography>

      <Image src="/static/images/illustrations/Dashboard.webp" alt="Dashboard" width={300} height={300} quality={100} />

    </div>
  );
};

Dashboard.suppressFirstRenderFlicker = true;
Dashboard.authenticate = { redirectTo: Routes.Login() };
Dashboard.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Dashboard());
Dashboard.getLayout = (page) => getDashboardNav(page, 'Accueil du Dashboard');

export default Dashboard;
