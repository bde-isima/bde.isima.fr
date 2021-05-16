import Link from "next/link"
import { useState } from "react"
import Menu from "@material-ui/core/Menu"
import Divider from "@material-ui/core/Divider"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import Apps from "mdi-material-ui/Apps"
import Vote from "mdi-material-ui/Vote"
import PuzzleOutline from "mdi-material-ui/PuzzleOutline"
import { CalculatorVariantOutline } from "mdi-material-ui/index"

export default function ModulesMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = Boolean(anchorEl)

  const handleOpen = (event) => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <IconButton
        className="mx-2 text-primary dark:text-secondary"
        aria-label="Voir les modules"
        aria-owns={isOpen ? "module-menu" : undefined}
        aria-haspopup="true"
        onClick={handleOpen}
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

        <Link href="/hub/modules/average">
          <MenuItem className="p-3" onClick={handleClose}>
            <CalculatorVariantOutline className="mx-3" />
            <Typography
              className="flex flex-grow items-center justify-center"
              variant="subtitle2"
              align="center"
              color="textPrimary"
            >
              Moyennes
            </Typography>
          </MenuItem>
        </Link>

        <Divider className="mx-3 mt-3" />

        <Link href="/hub/elections">
          <MenuItem className="p-3" onClick={handleClose}>
            <Vote className="mx-3" />
            <Typography
              className="flex flex-grow items-center justify-center"
              variant="subtitle2"
              align="center"
              color="textPrimary"
            >
              Élections BDE
            </Typography>
          </MenuItem>
        </Link>

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
