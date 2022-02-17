import { useQuery }                            from 'blitz'
import { Dispatch, SetStateAction, useEffect } from 'react'
import TableRow                                from '@mui/material/TableRow'
import TableCell                               from '@mui/material/TableCell'

import TableRows         from './TableRows'
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
  const { order, orderBy, page, search, rowsPerPage }                                 = useTableProps()
  const { rows, getQuery, queryArgs, columns, actions, allowCopy, onEdit, onSuccess } = props

  const columnContains = columns.filter((x) => search.value && x.searchCriteria && x.searchCriteria === 'contains')
  const columnHas      = columns.filter((x) => search.value && x.searchCriteria && x.searchCriteria === 'has')

  let or = [
    ...columnHas.map((x) => ({
      [x.id]: {
        [x.searchCriteria]: search.value,
      },
    })),
    ...columnContains.map((x) => ({
      [x.id]: {
        [x.searchCriteria]: search.value,
        mode              : 'insensitive',
      },
    }))
  ];

  const [res] = useQuery(getQuery, {
    skip   : page.value * rowsPerPage,
    take   : rowsPerPage,
    orderBy: { [orderBy.value]: order.value },
    ...(columnContains.length > 0 || columnHas.length > 0
      ? {
        where: {
          OR: or,
        },
      }
      : {}),
    ...queryArgs,
  })

  useEffect(() => {
    onSuccess(res)
  }, [onSuccess, res])

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length)
  const colSpan   =
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
          <TableCell colSpan={colSpan}/>
        </TableRow>
      ))}
    </>
  )
}
