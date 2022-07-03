import { useAuthenticatedSession } from '@blitzjs/auth'
import { Routes } from '@blitzjs/next'
import { RouteUrlObject } from 'blitz'
import { PublicData } from '@blitzjs/auth'

import Groups from '@mui/icons-material/GroupsTwoTone'
import Public from '@mui/icons-material/PublicTwoTone'
import School from '@mui/icons-material/SchoolTwoTone'
import Fastfood from '@mui/icons-material/FastfoodTwoTone'
import EventNote from '@mui/icons-material/EventNoteTwoTone'
import HowToVote from '@mui/icons-material/HowToVoteTwoTone'
import AccountBox from '@mui/icons-material/AccountBoxTwoTone'
import QueryStats from '@mui/icons-material/QueryStatsTwoTone'
import CalendarToday from '@mui/icons-material/CalendarTodayTwoTone'

export const config = [
  {
    icon: <EventNote />,
    text: 'EVENTS',
    to: '/dashboard/events',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/events'
  },
  {
    icon: <QueryStats />,
    text: 'STATISTIQUES',
    to: '/dashboard/analytics',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/analytics'
  },
  {
    icon: <Groups />,
    text: 'CLUBS',
    to: '/dashboard/clubs',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/clubs'
  },
  {
    icon: <Fastfood />,
    text: 'MARCHÉ',
    to: '/dashboard/articles',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/articles'
  },
  {
    icon: <AccountBox />,
    text: 'MEMBRES',
    to: '/dashboard/users',
    only: ['*'],
    isActive: (pathname: String) => pathname === '/dashboard/users'
  },
  {
    icon: <Public />,
    text: 'PARTENAIRES',
    to: '/dashboard/partners',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/partners'
  },
  {
    icon: <CalendarToday />,
    text: 'PLANNING',
    to: '/dashboard/planning',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/planning'
  },
  {
    icon: <School />,
    text: 'PROMOTIONS',
    to: '/dashboard/promotions',
    only: ['*', 'bde'],
    isActive: (pathname: String) => pathname === '/dashboard/promotions'
  },
  {
    icon: <HowToVote />,
    text: 'CAMPAGNES',
    to: '/dashboard/elections',
    only: ['*'],
    isActive: (pathname: String) => pathname === '/dashboard/elections'
  }
]

function filter(roles) {
  return config?.filter((c) => {
    return roles?.some((r) => {
      return c.only.some((o) => o.toLowerCase() === r.toLowerCase())
    })
  })
}

export function useBDEConfig() {
  const session = useAuthenticatedSession()
  return filter(session?.roles)
}

export function getBDEConfigServerSide(user) {
  return filter(user?.roles)
}

export const redirectAuthenticatedTo =
  (route: RouteUrlObject) =>
  ({ session }: { session: PublicData }) => {
    const only = config.find((c) => c.to === route.pathname)?.only
    if (only) {
      const isAuthorized = session.roles?.some((r) =>
        only.some((o) => o.toLowerCase() === r.toLowerCase())
      )
      if (isAuthorized) {
        return false
      }
    }
    return Routes.Hub()
  }
