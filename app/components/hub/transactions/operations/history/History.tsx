import { Fragment } from "react"
import { useInfiniteQuery } from "blitz"
import Button from "@material-ui/core/Button"

import TransactionRow from "../../display/TransactionRow"
import getTransactions from "app/entities/transactions/queries/getTransactions"

type HistoryProps = {
  userId?: string
}

export default function History({ userId }: HistoryProps) {
  const [
    groupedTransactions,
    { isFetching, isFetchingMore, fetchMore, canFetchMore },
  ] = useInfiniteQuery(
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
    <>
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
        className="my-4 w-full"
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
    </>
  )
}
