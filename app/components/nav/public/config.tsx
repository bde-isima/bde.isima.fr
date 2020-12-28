import Fire from "mdi-material-ui/Fire"
import Earth from "mdi-material-ui/Earth"
import School from "mdi-material-ui/School"
import BookSearch from "mdi-material-ui/BookSearch"
import MessageTextOutline from "mdi-material-ui/MessageTextOutline"
import AccountGroupOutline from "mdi-material-ui/AccountGroupOutline"

const config = [
  {
    icon: <Fire />,
    text: "LE BDE",
    to: "/#landing",
    isActive: (pathname: String, hash: String) => hash === "" || hash === "#landing",
  },
  {
    icon: <School />,
    text: "L'ÉCOLE",
    to: "/#school",
    isActive: (pathname: String, hash: String) => hash === "#school",
  },
  {
    icon: <AccountGroupOutline />,
    text: "CLUBS",
    to: "/#clubs",
    isActive: (pathname: String, hash: String) => hash === "#clubs",
  },
  {
    icon: <Earth />,
    text: "PARTENAIRES",
    to: "/#partners",
    isActive: (pathname: String, hash: String) => hash === "#partners",
  },
  {
    icon: <BookSearch />,
    text: "ANNALES",
    to: "https://drive.google.com/drive/u/0/folders/1GCfFZ7y_rwpN3wy3UiI-ALXzgxmeoTVA",
    isActive: (pathname: String, hash: String) => false,
  },
  {
    icon: <MessageTextOutline />,
    text: "CONTACT",
    to: "/#contact",
    isActive: (pathname: String, hash: String) => hash === "#contact",
  },
]

export default config
