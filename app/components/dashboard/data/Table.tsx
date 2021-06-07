import { ReactNode, useState } from 'react'
import Paper from '@material-ui/core/Paper'

import TableDialog from './TableDialog'
import TableContainer from './TableContainer'
import useSnackbar from 'app/entities/hooks/useSnackbar'
import { TablePropsProvider } from './TablePropsProvider'

type TableProps = {
  title: string
  columns: any[]
  queryKey: string
  getQuery: any
  queryArgs?: any
  upsertQuery: any
  deleteQuery: any
  allowCopy?: boolean
  actions?: any[]
  onExport?: (rowData: any) => void
  FormComponent?: ReactNode
}

export default function Table(props: TableProps) {
  const snackbar = useSnackbar()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Object | null>(null)

  const onAdd = () => {
    setValues({})
    setOpen(true)
  }

  const onEdit = (values) => {
    setValues(values)
    setOpen(true)
  }

  const onDialogClose = () => {
    setValues(null)
    setOpen(false)
  }

  return (
    <TablePropsProvider>
      <Paper className="w-full mb-4">
        <TableContainer
          snackbar={snackbar}
          onAdd={onAdd}
          onEdit={props.FormComponent ? onEdit : undefined}
          {...props}
        />

        {props.FormComponent && (
          <TableDialog
            open={open}
            values={values}
            snackbar={snackbar}
            onClose={onDialogClose}
            {...props}
          />
        )}
      </Paper>
    </TablePropsProvider>
  )
}
