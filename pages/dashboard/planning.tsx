import Typography from '@mui/material/Typography';

import Image from 'next/image';

import { BlitzPage, Routes } from '@blitzjs/next';

import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';

const Planning: BlitzPage = () => {
  return (
    <div className="flex flex-col place-self-center items-center">
      <Image src="/static/images/illustrations/WIP.svg" alt="Work In Progress" width={500} height={500} quality={100} />

      <Typography variant="h4" color="textPrimary" paragraph>
        En construction
      </Typography>
    </div>
  );
};

Planning.suppressFirstRenderFlicker = true;
Planning.authenticate = { redirectTo: Routes.Login() };
Planning.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Planning());
Planning.getLayout = (page) => getDashboardNav(page, 'Gestion des plannings');

export default Planning;
