import Link from "next/link"
import { useState } from "react"
import Apps from "mdi-material-ui/Apps"
import Menu from "@material-ui/core/Menu"
import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import PuzzleOutline from "mdi-material-ui/PuzzleOutline"
//import CalculatorVariant from 'mdi-material-ui/CalculatorVariant'

export default function ModulesMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)

  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        className="mx-2"
        aria-label="Voir les modules"
        aria-owns={isOpen ? "module-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
        color="inherit"
      >
        <Apps />
      </IconButton>

      <Menu
        id="module-menu"
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
            maxWidth: 300,
          },
        }}
        disableAutoFocusItem
      >
        <Typography className="pl-4 pt-4" variant="subtitle1">
          Modules
        </Typography>

        <Divider className="mx-3 mt-3" />

        <Link href="/hub/feedback">
          <MenuItem className="p-3" onClick={handleClose}>
            <PuzzleOutline className="mx-3" />
            <Typography
              className="flex flex-grow items-center justify-center"
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
