import Forum from '@mui/icons-material/ForumTwoTone'
import Public from '@mui/icons-material/PublicTwoTone'
import School from '@mui/icons-material/SchoolTwoTone'
import Groups from '@mui/icons-material/GroupsTwoTone'
import Whatshot from '@mui/icons-material/WhatshotTwoTone'
import MenuBook from '@mui/icons-material/MenuBookTwoTone'

const config = [
  {
    icon: <Whatshot />,
    text: 'LE BDE',
    to: '/#landing',
    isActive: (pathname: String, hash: String) => hash === '' || hash === '#landing',
  },
  {
    icon: <School />,
    text: "L'ÉCOLE",
    to: '/#school',
    isActive: (pathname: String, hash: String) => hash === '#school',
  },
  {
    icon: <Groups />,
    text: 'CLUBS',
    to: '/#clubs',
    isActive: (pathname: String, hash: String) => hash === '#clubs',
  },
  {
    icon: <Public />,
    text: 'PARTENAIRES',
    to: '/#partners',
    isActive: (pathname: String, hash: String) => hash === '#partners',
  },
  {
    icon: <MenuBook />,
    text: 'ANNALES',
    to: 'https://drive.google.com/drive/u/0/folders/1GCfFZ7y_rwpN3wy3UiI-ALXzgxmeoTVA',
    isActive: (pathname: String, hash: String) => false,
  },
  {
    icon: <Forum />,
    text: 'CONTACT',
    to: '/#contact',
    isActive: (pathname: String, hash: String) => hash === '#contact',
  },
]

export default config
