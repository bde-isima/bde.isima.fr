import { useState } from 'react'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import Apps from '@mui/icons-material/AppsTwoTone'
import HowToVote from '@mui/icons-material/HowToVoteTwoTone'
import Extension from '@mui/icons-material/ExtensionTwoTone'

import Menu from './Menu'
import Link from 'app/core/lib/Link'

export default function ModulesMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)

  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        className="mx-2 text-primary dark:text-secondary"
        aria-label="Voir les modules"
        aria-owns={isOpen ? 'module-menu' : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        size="large"
      >
        <Apps />
      </IconButton>

      <Menu id="modules-menu" anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <Typography className="pl-4 pt-2" variant="subtitle1">
          Modules
        </Typography>

        <Divider className="my-2" />

        <Link href="/hub/elections">
          <MenuItem className="p-2" onClick={handleClose}>
            <ListItemIcon>
              <HowToVote />
            </ListItemIcon>
            <Typography
              className="flex flex-grow items-center"
              variant="subtitle2"
              align="center"
              color="textPrimary"
            >
              Élections BDE
            </Typography>
          </MenuItem>
        </Link>

        <Link href="/hub/feedback">
          <MenuItem className="p-2" onClick={handleClose}>
            <ListItemIcon>
              <Extension />
            </ListItemIcon>
            <Typography
              className="flex flex-grow items-center"
              variant="subtitle2"
              align="center"
              color="textPrimary"
            >
              Proposez vos extensions !
            </Typography>
          </MenuItem>
        </Link>
      </Menu>
    </>
  )
}
