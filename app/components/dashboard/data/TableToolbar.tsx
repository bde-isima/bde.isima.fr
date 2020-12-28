import { useState } from "react"
import Toolbar from "@material-ui/core/Toolbar"
import Tooltip from "@material-ui/core/Tooltip"
import InputBase from "@material-ui/core/InputBase"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"

import Magnify from "mdi-material-ui/Magnify"
import DeleteOutline from "mdi-material-ui/DeleteOutline"
import PlusCircleOutline from "mdi-material-ui/PlusCircleOutline"

import TableDeleteConfirm from "./TableDeleteConfirm"

export default function TableToolbar({ title, numSelected, onAdd, onDelete, onSearch }) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = (value) => () => setOpen(value)

  return (
    <Toolbar className="pl-4 pr-2">
      {numSelected > 0 ? (
        <Typography className="sm:flex-auto" color="textSecondary" variant="subtitle1">
          {`${numSelected} sélectionné${numSelected > 1 ? "s" : ""}`}
        </Typography>
      ) : (
        <Typography className="sm:flex-auto" variant="h6" id="tableTitle">
          {title}
        </Typography>
      )}

      <TableDeleteConfirm open={open} onConfirm={onDelete} onClose={handleClickOpen(false)} />

      {numSelected > 0 ? (
        <Tooltip title="Supprimer">
          <IconButton aria-label="Supprimer" onClick={handleClickOpen(true)}>
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      ) : (
        <div className="flex ml-4 items-center">
          <Magnify />

          <InputBase
            placeholder="Rechercher..."
            classes={{ input: "p-2 sm:w-28 sm:focus:w-48 sm:transition sm:transition-width sm:duration-300 sm:ease-in-out" }}
            inputProps={{ "aria-label": "Rechercher" }}
            onKeyDown={onSearch}
          />

          <div>
            <Tooltip title="Ajouter">
              <IconButton aria-label="Ajouter" onClick={onAdd}>
                <PlusCircleOutline />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      )}
    </Toolbar>
  )
}
