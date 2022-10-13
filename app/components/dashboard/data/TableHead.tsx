import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import MUITableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';

type TableHeadProps = {
  columns: any[];
  onSelectAllClick: (event) => void;
  order: 'desc' | 'asc';
  orderBy: string;
  numSelected: number;
  rowCount: number;
  onRequestSort: (_, property) => void;
  actions?: any[];
  allowCopy?: boolean;
  onEdit?: (values: any) => void;
};

export default function TableHead({
  columns,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  actions,
  allowCopy,
  onEdit
}: TableHeadProps) {
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <MUITableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'Tout sélectionner' }}
            color="default"
          />
        </TableCell>

        {columns.map((col) => (
          <TableCell key={col.id} align="right" sortDirection={orderBy === col.id ? order : false}>
            <TableSortLabel
              disabled={!col.searchCriteria}
              active={orderBy === col.id}
              direction={orderBy === col.id ? order : 'asc'}
              onClick={createSortHandler(col.id)}
            >
              {col.headerName}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell
          align="right"
          colSpan={(actions?.length ?? 0) + Number(Boolean(allowCopy)) + Number(Boolean(onEdit)) + 1}
        >
          Actions
        </TableCell>
      </TableRow>
    </MUITableHead>
  );
}
