import { useQuery } from 'blitz'
import { useEffect } from 'react'
import { Dispatch, SetStateAction } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

import TableRows from './TableRows'
import { useTableProps } from './TablePropsProvider'

type TableCoreProps = {
  rows: any[]
  getQuery: any
  queryArgs?: any
  columns: any[]
  selected: { value: any[]; set: Dispatch<SetStateAction<string[]>> }
  handleCustomAction: (onClick: any) => (e: any) => Promise<void>
  actions?: any[]
  allowCopy?: boolean
  onEdit?: (values: any) => void
  onSuccess: (data) => void
}

export default function TableCore(props: TableCoreProps) {
  const { order, orderBy, page, search, rowsPerPage } = useTableProps()
  const { rows, getQuery, queryArgs, columns, actions, allowCopy, onEdit, onSuccess } = props

  const filteringColumns = columns.filter((x) => x.searchCriteria && x.searchCriteria !== 'equals')

  const [res] = useQuery(getQuery, {
    skip: page.value * rowsPerPage,
    take: rowsPerPage,
    orderBy: { [orderBy.value]: order.value },
    ...(filteringColumns.length > 0
      ? {
          where: {
            OR: filteringColumns.map((x) => ({
              [x.id]: {
                [x.searchCriteria]: search.value,
                mode: 'insensitive',
              },
            })),
          },
        }
      : {}),
    ...queryArgs,
  })

  useEffect(() => {
    onSuccess(res)
  }, [onSuccess, res])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length)
  const colSpan =
    columns.length +
    (actions?.length ?? 0) +
    Number(Boolean(allowCopy)) +
    Number(Boolean(onEdit)) +
    1

  return (
    <>
      <TableRows {...props} />

      {[...Array(emptyRows).keys()].map((x) => (
        <TableRow key={x} style={{ height: 81 }}>
          <TableCell colSpan={colSpan} />
        </TableRow>
      ))}
    </>
  )
}
