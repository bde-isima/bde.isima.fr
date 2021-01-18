import Paper from "@material-ui/core/Paper"
import { useState, ReactNode, useEffect } from "react"
import { useQuery, useMutation, invalidateQuery } from "blitz"
import TablePagination from "@material-ui/core/TablePagination"

import TableCore from "./TableCore"
import TableDialog from "./TableDialog"
import TableToolbar from "./TableToolbar"
import useSnackbar from "app/hooks/useSnackbar"
import useTableProps from "app/hooks/useTableProps"

type TableProps = {
  title: string
  columns: any[]
  variant?: "elevation" | "outlined" | undefined
  queryKey: string
  getQuery: any
  queryArgs?: any
  upsertQuery: any
  deleteQuery: any
  allowCopy?: boolean
  onExport?: (rowData: any) => void
  FormComponent?: ReactNode
  actions?: any[]
}

export default function Table({
  title,
  columns,
  variant = "elevation",
  queryKey,
  getQuery,
  queryArgs = {},
  upsertQuery,
  deleteQuery,
  allowCopy = false,
  onExport = undefined,
  FormComponent = undefined,
  actions = [],
}: TableProps) {
  const { page, order, search, orderBy, rowsPerPage } = useTableProps()

  const filteringColumns = columns.filter((x) => x.searchCriteria && x.searchCriteria !== "equals")

  const inputArgs = {
    skip: page.value * rowsPerPage,
    take: rowsPerPage,
    orderBy: {
      [orderBy.value]: order.value,
    },
    ...(filteringColumns.length > 0
      ? {
          where: {
            OR: filteringColumns.map((x) => ({
              [x.id]: {
                [x.searchCriteria]: search.value,
                mode: "insensitive",
              },
            })),
          },
        }
      : {}),
    ...queryArgs,
  }

  if (!Number.isNaN(search.value)) {
    columns
      .filter((x) => x.searchCriteria && x.searchCriteria === "equals")
      .map((x) => ({
        [x.id]: {
          [x.searchCriteria]: search.value,
        },
      }))
  }

  const [data, { isFetching }] = useQuery(getQuery, inputArgs, { suspense: false })

  const [deleteMutation] = useMutation(deleteQuery)

  const snackbar = useSnackbar()
  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Object | null>(null)
  const [selected, setSelected] = useState<string[]>([])

  const rows = data ? data[queryKey] : []
  const count = data ? data["count"] : -1

  const handleCustomAction = (onClick) => async (e) => {
    e.stopPropagation()
    await onClick()
    setSelected([])
  }

  const handleDeleteAllClick = async () => {
    await deleteMutation({ where: { id: { in: selected } } } as any)
      .then(() => {
        setSelected([])
        snackbar.onShow("success", "Supprimé(s)")
        invalidateQuery(getQuery)
      })
      .catch((err) => snackbar.onShow("error", err.message))
  }

  const handleExportAllClick = onExport
    ? async () => selected.forEach((x) => onExport(rows.find((r) => r.id === x)))
    : undefined

  const onPageChange = (event, newPage) => page.set(newPage)

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

  const onSearch = (e) => {
    if (e.key === "Enter") {
      search.set(e.target.value)
    }
  }

  useEffect(() => {
    if (page.value * rowsPerPage > rows.length) {
      page.set(Math.ceil(rows.length / rowsPerPage))
    }
  })

  return (
    <Paper className="w-full mb-4" variant={variant}>
      <TableToolbar
        title={title}
        numSelected={selected.length}
        onAdd={FormComponent ? onAdd : undefined}
        onDelete={handleDeleteAllClick}
        onExport={handleExportAllClick}
        onSearch={onSearch}
      />

      <TableCore
        rows={rows}
        columns={columns}
        selected={{ value: selected, set: setSelected }}
        onEdit={FormComponent ? onEdit : undefined}
        isFetching={isFetching}
        tableProps={{
          order,
          orderBy,
          rowsPerPage,
        }}
        handleCustomAction={handleCustomAction}
        actions={actions}
        allowCopy={allowCopy}
      />

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page.value}
        onPageChange={onPageChange}
      />

      <TableDialog
        open={open}
        values={values}
        columns={columns}
        onClose={onDialogClose}
        getQuery={getQuery}
        upsertQuery={upsertQuery}
        snackbar={snackbar}
        FormComponent={FormComponent}
      />
    </Paper>
  )
}
