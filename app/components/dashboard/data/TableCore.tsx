import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useQuery } from '@blitzjs/rpc';

import { useTableProps } from './TablePropsProvider';
import TableRows from './TableRows';

type TableCoreProps = {
  rows: any[];
  defaultSort?: { name: string; order: 'asc' | 'desc' };
  getQuery: any;
  queryArgs?: any;
  columns: any[];
  selected: { value: any[]; set: Dispatch<SetStateAction<string[]>> };
  handleCustomAction: (onClick: any) => (e: any) => Promise<void>;
  actions?: any[];
  allowCopy?: boolean;
  onEdit?: (values: any) => void;
  onSuccess: (data) => void;
};

export default function TableCore(props: TableCoreProps) {
  const { order, orderBy, page, search, rowsPerPage } = useTableProps();
  const { rows, defaultSort, getQuery, queryArgs, columns, actions, allowCopy, onEdit, onSuccess } = props;

  const filtering = columns.filter((x) => search.value && x.searchCriteria && x.searchCriteria !== 'equals');

  if (defaultSort) {
    order.value = defaultSort.order;
    orderBy.value = defaultSort.name;
  }

  const map = {
    contains: {
      // for string columns
      contains: search.value,
      mode: 'insensitive'
    },
    has: {
      // for array columns
      has: search.value
    }
  };

  let or = filtering.map((x) => ({
    [x.id]: map[x.searchCriteria]
  }));

  const [res] = useQuery(getQuery, {
    skip: page.value * rowsPerPage,
    take: rowsPerPage,
    orderBy: {
      [orderBy.value]: order.value
    },
    ...(filtering.length ? { where: { OR: or } } : {}),
    ...queryArgs
  });

  useEffect(() => {
    onSuccess(res);
  }, [onSuccess, res]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length);
  const colSpan = columns.length + (actions?.length ?? 0) + Number(Boolean(allowCopy)) + Number(Boolean(onEdit)) + 1;

  return (
    <>
      <TableRows {...props} />

      {[...Array(emptyRows).keys()].map((x) => (
        <TableRow key={x} style={{ height: 81 }}>
          <TableCell colSpan={colSpan} />
        </TableRow>
      ))}
    </>
  );
}
