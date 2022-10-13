import db from 'db';
import { GetServerSideProps } from 'next';

import { SessionContext, getSession } from '@blitzjs/auth';

import { gSSP } from 'app/blitz-server';
import { getBDEConfigServerSide } from 'app/components/nav/dashboard/bde-config';
import { getClubsConfigServerSide } from 'app/components/nav/dashboard/clubs-config';

export default function DashboardIndex() {
  return null;
}

export const getServerSideProps: GetServerSideProps = gSSP(async ({ req, res }) => {
  const clubs = await db.club.findMany();
  const session: SessionContext = await getSession(req, res);

  if (!session.$isAuthorized()) {
    return {
      redirect: {
        permanent: false,
        destination: '/hub'
      }
    };
  }

  const user = await db.user.findUnique({ where: { id: session?.userId! } });

  const bdeConfig = getBDEConfigServerSide(user);
  const clubsConfig = getClubsConfigServerSide(clubs, user);
  const config = bdeConfig.concat(clubsConfig);

  return {
    redirect: {
      permanent: false,
      destination: config.length > 0 ? config[0].to : '/hub'
    }
  };
});
