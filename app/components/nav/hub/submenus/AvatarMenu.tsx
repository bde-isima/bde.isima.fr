import Link from "next/link"
import { useState } from "react"
import { useMutation } from "blitz"
import Menu from "@material-ui/core/Menu"
import Avatar from "@material-ui/core/Avatar"
import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"

import Logout from "mdi-material-ui/Logout"
import CogOutline from "mdi-material-ui/CogOutline"
import MessageAlertOutline from "mdi-material-ui/MessageAlertOutline"

import logout from "app/auth/mutations/logout"
import { useCurrentUser } from "app/hooks/useCurrentUser"

export default function ModulesMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)

  const [user] = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  const onLogout = () => {
    logoutMutation()
  }

  return (
    <>
      <Avatar
        className="mx-2"
        src={user?.image ?? undefined}
        onClick={handleOpen}
        alt="Photo de profil"
      />

      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        MenuListProps={{ disablePadding: true }}
        PaperProps={{
          style: {
            maxHeight: 72 * 5,
            maxWidth: 200,
          },
        }}
        disableAutoFocusItem
      >
        <Typography className="pt-4 pl-4 pr-4" variant="subtitle1" noWrap>
          {user?.nickname || `${user?.firstname} ${user?.lastname}`}
        </Typography>

        <Divider className="m-3" />

        <Link href="/hub/settings">
          <MenuItem className="p-3" onClick={handleClose}>
            <CogOutline className="mx-3" />
            <Typography
              className="flex flex-grow items-center"
              variant="subtitle2"
              align="center"
              color="textPrimary"
            >
              Paramètres
            </Typography>
          </MenuItem>
        </Link>

        <Link href="/hub/feedback">
          <MenuItem className="p-3" onClick={handleClose}>
            <MessageAlertOutline className="mx-3" />
            <Typography
              className="flex flex-grow items-center"
              variant="subtitle2"
              align="center"
              color="textPrimary"
            >
              Feedback
            </Typography>
          </MenuItem>
        </Link>

        <MenuItem className="p-3" onClick={onLogout}>
          <Logout className="mx-3" />
          <Typography
            className="flex flex-grow items-center"
            variant="subtitle2"
            align="center"
            color="textPrimary"
          >
            Déconnexion
          </Typography>
        </MenuItem>
      </Menu>
    </>
  )
}
