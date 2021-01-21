import { createContext, useContext, useState, Dispatch } from "react"

type TablePropsType = {
  order: {
    value: "desc" | "asc"
    set: Dispatch<"desc" | "asc">
  }
  orderBy: {
    value: string
    set: Dispatch<string>
  }
  page: {
    value: number
    set: Dispatch<number>
  }
  search: {
    value: string
    set: Dispatch<string>
  }
  rowsPerPage: number
}

const TablePropsContext = createContext<TablePropsType>({} as any)

export const useTableProps = () => {
  return useContext(TablePropsContext)
}

export function TablePropsProvider({ children }) {
  const rowsPerPage = 5
  const [order, setOrder] = useState<"desc" | "asc">("desc")
  const [orderBy, setOrderBy] = useState<string>("createdAt")
  const [page, setPage] = useState<number>(0)
  const [search, setSearch] = useState<string>("")

  return (
    <TablePropsContext.Provider
      value={{
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
      }}
    >
      {children}
    </TablePropsContext.Provider>
  )
}
