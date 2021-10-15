import Fastfood from '@mui/icons-material/FastfoodTwoTone'
import DeviceHub from '@mui/icons-material/DeviceHubTwoTone'
import EventNote from '@mui/icons-material/EventNoteTwoTone'
import EmojiEvents from '@mui/icons-material/EmojiEventsTwoTone'

const config = [
  {
    icon: <DeviceHub />,
    text: 'HUB',
    to: '/hub',
    isActive: (pathname: String) => pathname === '/hub',
  },
  {
    icon: <EventNote />,
    text: 'ÉVÉNEMENTS',
    to: '/hub/events',
    isActive: (pathname: String) => pathname === '/hub/events',
  },
  {
    icon: <Fastfood />,
    text: 'MARCHÉ',
    to: '/hub/market',
    isActive: (pathname: String) => pathname === '/hub/market',
  },
  {
    icon: <EmojiEvents />,
    text: 'CLASSEMENT',
    to: '/hub/leaderboard',
    isActive: (pathname: String) => pathname === '/hub/leaderboard',
  },
]

export default config
