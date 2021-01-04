import { Fragment } from "react"
import Button from "@material-ui/core/Button"
import { useInfiniteQuery } from "react-query"

import TransactionRow from "../../display/TransactionRow"

type HistoryProps = {
  userId?: string
}

export default function History({ userId }: HistoryProps) {
  const [
    groupedTransactions,
    { isFetching, isFetchingMore, fetchMore, canFetchMore },
  ] = useInfiniteQuery(
    "history",
    getTransactions,
    (
      page = {
        take: 10,
        skip: 0,
      }
    ) => ({ ...page, where: { userId }, orderBy: { createdAt: "desc" } }),
    {
      getFetchMore: (lastGroup) => lastGroup.nextPage,
      enabled: Boolean(userId),
    }
  )

  return (
    <div className="flex flex-col justify-center">
      {groupedTransactions &&
        groupedTransactions.map((group, i) => (
          <Fragment key={i}>
            {group.transactions.map((t) => (
              <TransactionRow key={t.id} values={t} />
            ))}
          </Fragment>
        ))}

      <div className="flex flex-grow" />

      <Button
        className="m-4"
        onClick={() => fetchMore()}
        color="primary"
        variant="outlined"
        disabled={!canFetchMore || !!isFetchingMore}
      >
        {isFetching || isFetchingMore
          ? "Chargement ..."
          : canFetchMore
          ? "Charger plus"
          : "Plus rien à charger"}
      </Button>
    </div>
  )
}
