import Store from 'mdi-material-ui/Store'
import Hubspot from 'mdi-material-ui/Hubspot'
import CalendarToday from 'mdi-material-ui/CalendarToday'
import TrophyOutline from 'mdi-material-ui/TrophyOutline'

const config = [
  {
    icon: <Hubspot />,
    text: 'HUB',
    to: '/hub',
    isActive: (pathname: String) => pathname === '/hub',
  },
  {
    icon: <CalendarToday />,
    text: 'ÉVÉNEMENTS',
    to: '/hub/events',
    isActive: (pathname: String) => pathname === '/hub/events',
  },
  {
    icon: <Store />,
    text: 'MARCHÉ',
    to: '/hub/market',
    isActive: (pathname: String) => pathname === '/hub/market',
  },
  {
    icon: <TrophyOutline />,
    text: 'CLASSEMENT',
    to: '/hub/leaderboard',
    isActive: (pathname: String) => pathname === '/hub/leaderboard',
  },
]

export default config
