import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { useMutation, invalidateQuery } from 'blitz'
import { useState, ReactNode, Suspense } from 'react'
import TablePagination from '@mui/material/TablePagination'
import MuiTableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'

import TableHead from './TableHead'
import TableCore from './TableCore'
import TableToolbar from './TableToolbar'
import { useTableProps } from './TablePropsProvider'

type TableProps = {
  title: string
  columns: any[]
  snackbar: any
  queryKey: string
  getQuery: any
  queryArgs?: any
  deleteQuery: any
  allowCopy?: boolean
  onExport?: (rowData: any) => void
  FormComponent?: (props: unknown) => JSX.Element
  actions?: any[]
  onAdd: () => void
  onEdit?: (values) => void
}

export default function TableContainer(props: TableProps) {
  const {
    title,
    columns,
    snackbar,
    getQuery,
    queryKey,
    deleteQuery,
    allowCopy,
    onExport,
    FormComponent,
    actions = [],
    onAdd,
    onEdit
  } = props
  const [data, setData] = useState({})
  const rows = data[queryKey] ?? []
  const count = data['count'] ?? 0

  const { page, order, orderBy, rowsPerPage } = useTableProps()
  const colSpan =
    columns.length +
    (actions?.length ?? 0) +
    Number(Boolean(allowCopy)) +
    Number(Boolean(onEdit)) +
    1

  const [deleteMutation] = useMutation(deleteQuery)

  const [selected, setSelected] = useState<string[]>([])

  const onSuccess = (data) => {
    setData(data)
  }

  const onPageChange = (_, newPage) => page.set(newPage)

  const handleCustomAction = (onClick) => async (e) => {
    e.stopPropagation()
    await onClick()
    setSelected([])
  }

  const handleDeleteAllClick = async () => {
    await deleteMutation({ where: { id: { in: selected } } } as any)
      .then(() => {
        setSelected([])
        snackbar.onShow('success', 'Supprimé(s)')
        invalidateQuery(getQuery)
      })
      .catch((err) => snackbar.onShow('error', err.message))
  }

  const handleExportAllClick = onExport
    ? async () => selected.forEach((x) => onExport(rows.find((r: any) => r.id === x)))
    : undefined

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy.value === property && order.value === 'asc'
    orderBy.set(property)
    order.set(isAsc ? 'desc' : 'asc')
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n: any) => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const FallbackComponent = (
    <>
      <TableRow style={{ height: 81 }}>
        <TableCell className="text-center" colSpan={colSpan}>
          <CircularProgress size={25} color="inherit" />
        </TableCell>
      </TableRow>

      {[...Array(rowsPerPage - 1).keys()].map((x) => (
        <TableRow key={x} style={{ height: 81 }}>
          <TableCell colSpan={colSpan} />
        </TableRow>
      ))}
    </>
  )

  return (
    <>
      <TableToolbar
        title={title}
        numSelected={selected.length}
        onAdd={FormComponent ? onAdd : undefined}
        onDelete={handleDeleteAllClick}
        onExport={handleExportAllClick}
      />

      <MuiTableContainer className="text-center">
        <Table aria-labelledby="tableTitle" aria-label="Table de données">
          <TableHead
            numSelected={selected.length}
            order={order.value}
            orderBy={orderBy.value}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={count}
            {...props}
          />

          <TableBody>
            <Suspense fallback={FallbackComponent}>
              <TableCore
                rows={rows}
                selected={{ value: selected, set: setSelected }}
                handleCustomAction={handleCustomAction}
                onSuccess={onSuccess}
                {...props}
              />
            </Suspense>
          </TableBody>
        </Table>
      </MuiTableContainer>

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page.value}
        onPageChange={onPageChange}
      />
    </>
  )
}
