import { useMemo } from 'react';

import Dashboard from '@mui/icons-material/DashboardTwoTone';

import { useBDEConfig } from 'app/components/nav/dashboard/bde-config';
import { useClubsConfig } from 'app/components/nav/dashboard/clubs-config';
import DesktopMenuItem from 'app/components/nav/hub/DesktopMenuItem';

import config from './config';

export default function Desktop() {
  const bdeConfig = useBDEConfig();

  return useMemo(
    () => (
      <>
        {config.map((item) => (
          <DesktopMenuItem key={item.to} item={item} />
        ))}

        {(bdeConfig.length > 0) && (
          <DesktopMenuItem
            item={{
              icon: <Dashboard />,
              text: 'DASHBOARD',
              to: '/dashboard',
              isActive: (pathname: String, _hash: String) => pathname === '/dashboard'
            }}
          />
        )}
      </>
    ),
    [bdeConfig.length]
  );
}
