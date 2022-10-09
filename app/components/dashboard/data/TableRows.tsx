import { Dispatch, SetStateAction } from 'react';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import ContentCopy from '@mui/icons-material/ContentCopyTwoTone';
import Edit from '@mui/icons-material/EditTwoTone';

import { useTableProps } from './TablePropsProvider';
import { getComparator, stableSort } from './sort';

type TableCoreProps = {
  rows: any[];
  columns: any[];
  selected: { value: any[]; set: Dispatch<SetStateAction<string[]>> };
  onEdit?: (values: any) => void;
  handleCustomAction: (onClick: any) => (e: any) => Promise<void>;
  allowCopy?: boolean;
  actions?: any[];
};

export default function TableRows({
  rows,
  columns,
  selected,
  onEdit,
  handleCustomAction,
  allowCopy,
  actions
}: TableCoreProps) {
  const { order, orderBy } = useTableProps();
  const isSelected = (id) => selected.value.indexOf(id) !== -1;

  const handleClick = (_, id) => {
    const selectedIndex = selected.value.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected.value, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.value.slice(1));
    } else if (selectedIndex === selected.value.length - 1) {
      newSelected = newSelected.concat(selected.value.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.value.slice(0, selectedIndex), selected.value.slice(selectedIndex + 1));
    }

    selected.set(newSelected);
  };

  const editClick = (row) => (e) => {
    e.stopPropagation();
    onEdit && onEdit(row);
  };

  const copyClick = (row) => (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = row;
    e.stopPropagation();
    onEdit && onEdit({ ...rest });
  };

  return stableSort(rows, getComparator(order.value, orderBy.value)).map((row, index) => {
    const isItemSelected = isSelected(row.id);
    const labelId = `enhanced-table-checkbox-${index}`;
    const [firstColumn, ...restColumns] = columns;

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
          <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} color="default" />
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
          const { icon, tooltip, onClick, disabled } = action(row);
          return (
            <TableCell key={idx} align="right">
              <Tooltip title={tooltip}>
                <span>
                  <IconButton
                    aria-label={tooltip}
                    onClick={handleCustomAction(onClick(row))}
                    disabled={disabled}
                    size="large"
                  >
                    {icon}
                  </IconButton>
                </span>
              </Tooltip>
            </TableCell>
          );
        })}

        {allowCopy && (
          <TableCell align="right">
            <Tooltip title="Copier">
              <IconButton aria-label="Copier" onClick={copyClick(row)} size="large">
                <ContentCopy />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}

        {onEdit && (
          <TableCell align="right">
            <Tooltip title="Éditer">
              <IconButton aria-label="Éditer" onClick={editClick(row)} size="large">
                <Edit />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
    );
  });
}
