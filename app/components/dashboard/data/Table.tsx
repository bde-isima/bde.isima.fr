import { useState } from 'react';

import useSnackbar from 'app/entities/hooks/useSnackbar';

import TableContainer from './TableContainer';
import TableDialog from './TableDialog';
import { TablePropsProvider } from './TablePropsProvider';

type TableProps = {
  title: string;
  columns: any[];
  defaultSort?: { name: string; order: 'asc' | 'desc' };
  queryKey: string;
  getQuery: any;
  queryArgs?: any;
  upsertQuery: any;
  deleteQuery: any;
  allowCopy?: boolean;
  actions?: any[];
  onExport?: (rowData: any) => void;
  FormComponent?: (props: unknown) => JSX.Element;
};

export default function Table(props: TableProps) {
  const snackbar = useSnackbar();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<Object | null>(null);

  const onAdd = () => {
    setValues({});
    setOpen(true);
  };

  const onEdit = (values) => {
    setValues(values);
    setOpen(true);
  };

  const onDialogClose = () => {
    setValues(null);
    setOpen(false);
  };

  return (
    <TablePropsProvider>
      <div className="w-full mb-4">
        <TableContainer
          snackbar={snackbar}
          onAdd={onAdd}
          onEdit={props.FormComponent ? onEdit : undefined}
          {...props}
        />

        {props.FormComponent && (
          <TableDialog open={open} values={values} snackbar={snackbar} onClose={onDialogClose} {...props} />
        )}
      </div>
    </TablePropsProvider>
  );
}
