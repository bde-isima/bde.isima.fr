import Link from 'next/link'
import { cloneElement } from 'react'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'

import { useCustomRouter } from 'app/entities/hooks/useCustomRouter'

type MobileMenuItemProps = {
  item: any
  onClose: () => void
}

export default function MobileMenuItem({ item, onClose }: MobileMenuItemProps) {
  const { router } = useCustomRouter()

  const isActive = item.isActive(router.asPath, window.location.hash)

  return (
    <Link href={item.to}>
      <Button
        className={`${isActive && 'bg-primary'} w-11/12 rounded-full my-1`}
        variant={isActive ? 'contained' : 'text'}
        size="small"
        onClick={onClose}
      >
        <ListItem dense disableGutters>
          <ListItemIcon>
            {cloneElement(item.icon, { className: `${isActive ? 'text-white' : ''} rounded-full` })}
          </ListItemIcon>

          <ListItemText
            secondary={item.text}
            secondaryTypographyProps={{ color: isActive ? 'secondary' : 'textPrimary' }}
          />
        </ListItem>
      </Button>
    </Link>
  )
}
