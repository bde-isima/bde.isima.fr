import { useState, ReactNode } from "react"
import Paper from "@material-ui/core/Paper"
import TablePagination from "@material-ui/core/TablePagination"
import { usePaginatedQuery, useMutation, useRouter } from 'blitz'

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
  FormComponent: ReactNode
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
  FormComponent,
  actions = [],
}: TableProps) {
  const { page, order, search, orderBy, rowsPerPage } = useTableProps()

  const inputArgs = {
    skip: page.value * rowsPerPage,
    take: rowsPerPage,
    orderBy: {
      [orderBy.value]: order.value,
    },
    where: {
      OR: columns
        .filter((x) => x.searchCriteria && x.searchCriteria !== "equals")
        .map((x) => ({
          [x.id]: {
            [x.searchCriteria]: search.value,
            mode: "insensitive",
          },
        })),
    },
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

  const router = useRouter()
  const [result, { refetch, isFetching }] = usePaginatedQuery(getQuery, inputArgs, {
    suspense: false,
  })
  const [deleteMutation] = useMutation(deleteQuery)

  const [open, setOpen] = useState(false)
  const [values, setValues] = useState<Object | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const { open: snackOpen, message, severity } = useSnackbar()

  const rows = result ? result[queryKey] : []
  const count = result ? result["count"] : -1

  const handleCustomAction = (onClick) => async (e) => {
    e.stopPropagation()
    await onClick()
    refetch()
    setSelected([])
  }

  const handleDeleteAllClick = async () => {
    await deleteMutation({ where: { id: { in: selected } } } as any)
      .then(() => {
        message.set("Supprimé(s)")
        severity.set("success")
        setSelected([])
      })
      .catch((err) => {
        message.set(err.message)
        severity.set("error")
      })
      .finally(() => {
        snackOpen.set(true)
      })
    refetch()
  }

  const onPageChange = (event, newPage) => page.set(newPage)

  const onAdd = () => {
    setValues({})
    setOpen(true)
  }

  const onEdit = (values) => {
    setValues(values)
    setOpen(true)
  }

  const onClose = () => {
    setValues(null)
    setOpen(false)
  }

  const onSearch = (e) => {
    if (e.key === "Enter") {
      search.set(e.target.value)
    }
  }

  return (
    <Paper className="w-full mb-4" variant={variant}>
      <TableToolbar
        title={title}
        numSelected={selected.length}
        onAdd={onAdd}
        onDelete={handleDeleteAllClick}
        onSearch={onSearch}
      />

      <TableCore
        rows={rows}
        columns={columns}
        selected={{ value: selected, set: setSelected }}
        onEdit={onEdit}
        isFetching={isFetching || router.isFallback}
        tableProps={{
          order,
          orderBy,
          rowsPerPage,
        }}
        handleCustomAction={handleCustomAction}
        actions={actions}
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
        onClose={onClose}
        upsertQuery={upsertQuery}
        refetch={refetch}
        snackbar={{ snackOpen, message, severity }}
        FormComponent={FormComponent}
      />
    </Paper>
  )
}
