import Checkbox from "@material-ui/core/Checkbox"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import MUITableHead from "@material-ui/core/TableHead"
import TableSortLabel from "@material-ui/core/TableSortLabel"

export default function TableHead({
  columns,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  actions,
}) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property)

  return (
    <MUITableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "Tout sélectionner" }}
            color="default"
          />
        </TableCell>

        {columns.map((col) => (
          <TableCell key={col.id} align="right" sortDirection={orderBy === col.id ? order : false}>
            <TableSortLabel
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : "asc"}
              onClick={createSortHandler(col.id)}
            >
              {col.headerName}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell align="right" colSpan={1 + actions.length}>
          Actions
        </TableCell>
      </TableRow>
    </MUITableHead>
  )
}
