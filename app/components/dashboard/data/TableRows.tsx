import Tooltip from '@material-ui/core/Tooltip'
import { Dispatch, SetStateAction } from 'react'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'

import ContentCopy from 'mdi-material-ui/ContentCopy'
import CircleEditOutline from 'mdi-material-ui/CircleEditOutline'

import { stableSort, getComparator } from './sort'
import { useTableProps } from './TablePropsProvider'

type TableCoreProps = {
  rows: any[]
  columns: any[]
  selected: { value: any[]; set: Dispatch<SetStateAction<string[]>> }
  onEdit?: (values: any) => void
  handleCustomAction: (onClick: any) => (e: any) => Promise<void>
  allowCopy?: boolean
  actions?: any[]
}

export default function TableRows({
  rows,
  columns,
  selected,
  onEdit,
  handleCustomAction,
  allowCopy,
  actions,
}: TableCoreProps) {
  const { order, orderBy } = useTableProps()
  const isSelected = (id) => selected.value.indexOf(id) !== -1

  const handleClick = (_, id) => {
    const selectedIndex = selected.value.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected.value, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.value.slice(1))
    } else if (selectedIndex === selected.value.length - 1) {
      newSelected = newSelected.concat(selected.value.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.value.slice(0, selectedIndex),
        selected.value.slice(selectedIndex + 1)
      )
    }

    selected.set(newSelected)
  }

  const editClick = (row) => (e) => {
    e.stopPropagation()
    onEdit && onEdit(row)
  }

  const copyClick = (row) => (e) => {
    const { id, ...rest } = row
    e.stopPropagation()
    onEdit && onEdit({ ...rest })
  }

  return stableSort(rows, getComparator(order.value, orderBy.value)).map((row, index) => {
    const isItemSelected = isSelected(row.id)
    const labelId = `enhanced-table-checkbox-${index}`
    const [firstColumn, ...restColumns] = columns

    return (
      <TableRow
        hover
        onClick={(event) => handleClick(event, row.id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row.id}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
            color="default"
          />
        </TableCell>

        <TableCell component="th" id={labelId} scope="row" align="right">
          {firstColumn.render ? firstColumn.render(row) : row[firstColumn.id]}
        </TableCell>

        {restColumns.map((cell, idx) => (
          <TableCell key={idx} align="right">
            {cell.render ? cell.render(row) : row[cell.id]}
          </TableCell>
        ))}

        {actions?.map((action, idx) => {
          const { icon, tooltip, onClick, disabled } = action(row)
          return (
            <TableCell key={idx} align="right">
              <Tooltip title={tooltip}>
                <span>
                  <IconButton
                    aria-label={tooltip}
                    onClick={handleCustomAction(onClick(row))}
                    disabled={disabled}
                  >
                    {icon}
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
          )
        })}

        {allowCopy && (
          <TableCell align="right">
            <Tooltip title="Copier">
              <IconButton aria-label="Copier" onClick={copyClick(row)}>
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}

        {onEdit && (
          <TableCell align="right">
            <Tooltip title="Éditer">
              <IconButton aria-label="Éditer" onClick={editClick(row)}>
                <CircleEditOutline />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
    )
  })
}
