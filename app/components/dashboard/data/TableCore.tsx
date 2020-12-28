import MUITable from "@material-ui/core/Table"
import Tooltip from "@material-ui/core/Tooltip"
import { Dispatch, SetStateAction } from "react"
import TableRow from "@material-ui/core/TableRow"
import Checkbox from "@material-ui/core/Checkbox"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import IconButton from "@material-ui/core/IconButton"
import TableContainer from "@material-ui/core/TableContainer"
import CircularProgress from "@material-ui/core/CircularProgress"

import CircleEditOutline from "mdi-material-ui/CircleEditOutline"

import TableHead from "./TableHead"
import { stableSort, getComparator } from "./sort"

type TableCoreProps = {
  rows: any[]
  columns: any[]
  selected: { value: any[]; set: Dispatch<SetStateAction<string[]>> }
  onEdit: (values: any) => void
  isFetching: boolean
  tableProps: any
  handleCustomAction: (onClick: any) => (e: any) => Promise<void>
  actions: any[]
}

export default function TableCore({
  rows,
  columns,
  selected,
  onEdit,
  isFetching,
  tableProps,
  handleCustomAction,
  actions,
}: TableCoreProps) {
  const { order, orderBy, rowsPerPage } = tableProps

  const isSelected = (id) => selected.value.indexOf(id) !== -1
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length)

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy.value === property && order.value === "asc"
    orderBy.set(property)
    order.set(isAsc ? "desc" : "asc")
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id)
      selected.set(newSelecteds)
      return
    }
    selected.set([])
  }

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
    onEdit(row)
  }

  return (
    <TableContainer className="text-center">
      <MUITable aria-labelledby="tableTitle" aria-label="Table de données">
        <TableHead
          columns={columns}
          numSelected={selected.value.length}
          order={order.value}
          orderBy={orderBy.value}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          actions={actions}
        />

        <TableBody>
          {!isFetching &&
            stableSort(rows, getComparator(order.value, orderBy.value)).map((row, index) => {
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
                      inputProps={{ "aria-labelledby": labelId }}
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

                  {actions.map((action, idx) => {
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

                  <TableCell align="right">
                    <Tooltip title="Éditer">
                      <IconButton aria-label="Éditer" onClick={editClick(row)}>
                        <CircleEditOutline />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })}

          {isFetching && (
            <TableRow style={{ height: 81 }}>
              <TableCell className="text-center" colSpan={columns.length + 2}>
                <CircularProgress size={25} color="inherit" />
              </TableCell>
            </TableRow>
          )}

          {(isFetching || emptyRows > 0) &&
            [...Array(isFetching ? rowsPerPage - 1 : emptyRows).keys()].map((x) => (
              <TableRow key={x} style={{ height: 81 }}>
                <TableCell colSpan={columns.length + 2 + actions.length} />
              </TableRow>
            ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  )
}
