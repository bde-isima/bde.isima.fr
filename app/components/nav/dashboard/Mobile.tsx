import { useMemo } from 'react';

import Divider from '@mui/material/Divider';

import Dashboard from '@mui/icons-material/DashboardTwoTone';

import { useBDEConfig } from 'app/components/nav/dashboard/bde-config';
import { useClubsConfig } from 'app/components/nav/dashboard/clubs-config';
import MobileMenuItem from 'app/components/nav/hub/MobileMenuItem';

export default function Mobile({ onClose }) {
  const bdeConfig = useBDEConfig();

  const ItemsList = ({ config }) =>
    useMemo(
      () => (
        <>
          {config.map((item) => (
            <MobileMenuItem key={item.to} item={item} onClose={onClose} />
          ))}
        </>
      ),
      [config]
    );

  return (
    <>
      {(bdeConfig.length > 0) && (
        <MobileMenuItem
          item={{
            icon: <Dashboard />,
            text: 'DASHBOARD',
            to: '/dashboard',
            isActive: (pathname: String, _hash: String) => pathname === '/dashboard'
          }}
          onClose={onClose}
        />
      )}

      {bdeConfig.length > 0 && <Divider className="m-2" />}

      <ItemsList config={bdeConfig} />

      {<Divider className="m-2" />}

    </>
  );
}
