import { useState } from 'react'
import Menu from '@mui/material/Menu'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import Apps from '@mui/icons-material/AppsTwoTone'
import HowToVote from '@mui/icons-material/HowToVoteTwoTone'
import Extension from '@mui/icons-material/ExtensionTwoTone'

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

      <Menu
        id="module-menu"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Typography className="pl-4 pt-2" variant="subtitle1">
          Modules
        </Typography>

        <Divider className="my-2" />

        <Link href="/hub/elections">
          <MenuItem className="p-2" onClick={handleClose}>
            <ListItemIcon>
              <HowToVote />
            </ListItemIcon>
            Élections BDE
          </MenuItem>
        </Link>

        <Link href="/hub/feedback">
          <MenuItem className="p-2" onClick={handleClose}>
            <ListItemIcon>
              <Extension />
            </ListItemIcon>
            Proposez vos extensions !
          </MenuItem>
        </Link>
      </Menu>
    </>
  )
}
