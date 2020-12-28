import { useState } from "react"

export default function useTableProps() {
  const rowsPerPage = 5
  const [order, setOrder] = useState<"desc" | "asc">("desc")
  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [page, setPage] = useState<number>(0)
  const [search, setSearch] = useState<string>("")

  return {
    order: {
      value: order,
      set: setOrder,
    },
    orderBy: {
      value: orderBy,
      set: setOrderBy,
    },
    page: {
      value: page,
      set: setPage,
    },
    search: {
      value: search,
      set: setSearch,
    },
    rowsPerPage,
  }
}
