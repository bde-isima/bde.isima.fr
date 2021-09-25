import { useMemo } from 'react'
import Divider from '@mui/material/Divider'

import ViewDashboardOutline from 'mdi-material-ui/ViewDashboardOutline'

import MobileMenuItem from 'app/components/nav/hub/MobileMenuItem'
import { useBDEConfig } from 'app/components/nav/dashboard/useBDEConfig'
import { useClubsConfig } from 'app/components/nav/dashboard/useClubsConfig'

export default function Mobile({ onClose }) {
  const bdeConfig = useBDEConfig()
  const clubsConfig = useClubsConfig()

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
    )

  return (
    <>
      {(bdeConfig.length > 0 || clubsConfig.length > 0) && (
        <MobileMenuItem
          item={{
            icon: <ViewDashboardOutline />,
            text: 'DASHBOARD',
            to: '/dashboard',
            isActive: (pathname: String, hash: String) => pathname === '/dashboard',
          }}
          onClose={onClose}
        />
      )}

      {bdeConfig.length > 0 && <Divider className="m-2" />}

      <ItemsList config={bdeConfig} />

      {clubsConfig.length > 0 && <Divider className="m-2" />}

      <ItemsList config={clubsConfig} />
    </>
  )
}
