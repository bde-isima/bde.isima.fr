import MUIMenu, { MenuProps as MUIMenuProps } from '@mui/material/Menu';

function Menu({ id, anchorEl, open, onClose, children }: MUIMenuProps) {
  return (
    <MUIMenu
      id={id}
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1
          },
          '&:after, &:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            transform: 'translateY(-50%) rotate(45deg)'
          },
          '&:after': {
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            zIndex: 0
          },
          '&:before': {
            right: 13,
            width: 12,
            height: 12,
            bgcolor: 'divider',
            zIndex: -1
          }
        }
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      {children}
    </MUIMenu>
  );
}

export default Menu;
