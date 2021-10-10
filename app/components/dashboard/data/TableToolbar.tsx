import { useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import InputBase from '@mui/material/InputBase'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'

import Delete from '@mui/icons-material/DeleteTwoTone'
import Search from '@mui/icons-material/SearchTwoTone'
import AddCircle from '@mui/icons-material/AddCircleTwoTone'
import FileDownload from '@mui/icons-material/FileDownloadTwoTone'

import { useTableProps } from './TablePropsProvider'
import TableDeleteConfirm from './TableDeleteConfirm'

export default function TableToolbar({ title, numSelected, onAdd, onDelete, onExport }) {
  const { search } = useTableProps()
  const [open, setOpen] = useState(false)

  const handleClickOpen = (value) => () => setOpen(value)

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      search.set(e.target.value)
    }
  }

  return (
    <Toolbar className="pl-4 pr-2">
      {numSelected > 0 ? (
        <Typography className="sm:flex-auto flex-grow" color="textSecondary" variant="subtitle1">
          {`${numSelected} sélectionné${numSelected > 1 ? 's' : ''}`}
        </Typography>
      ) : (
        <Typography className="sm:flex-auto" variant="h6" id="tableTitle">
          {title}
        </Typography>
      )}

      <TableDeleteConfirm open={open} onConfirm={onDelete} onClose={handleClickOpen(false)} />

      {numSelected > 0 ? (
        <div className="flex ml-4 items-center">
          {onExport && (
            <Tooltip title="Exporter en CSV">
              <IconButton aria-label="Exporter en CSV" onClick={onExport} size="large">
                <FileDownload />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Supprimer">
            <IconButton aria-label="Supprimer" onClick={handleClickOpen(true)} size="large">
              <Delete />
            </IconButton>
          </Tooltip>
        </div>
      ) : (
        <div className="flex ml-4 items-center">
          <Search />

          <InputBase
            placeholder="Rechercher..."
            classes={{
              input:
                'p-2 sm:w-28 sm:focus:w-48 sm:transition sm:transition-width sm:duration-300 sm:ease-in-out',
            }}
            inputProps={{ 'aria-label': 'Rechercher' }}
            onKeyDown={onSearch}
          />

          {onAdd && (
            <div>
              <Tooltip title="Ajouter">
                <IconButton aria-label="Ajouter" onClick={onAdd} size="large">
                  <AddCircle />
                </IconButton>
              </Tooltip>
            </div>
          )}
        </div>
      )}
    </Toolbar>
  )
}
