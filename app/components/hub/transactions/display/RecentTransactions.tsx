import { useQuery } from "blitz"
import Skeleton from "@material-ui/core/Skeleton"

import { useCurrentUser } from "app/hooks/useCurrentUser"
import TransactionRow from "app/components/hub/transactions/display/TransactionRow"
import getTransactions from "app/entities/transactions/queries/getTransactions"

export default function RecentTransactions() {
  const [user] = useCurrentUser()

  const [{ transactions }, { isFetching, failureCount }] = useQuery(getTransactions, {
    where: { userId: user?.id },
    take: 10,
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      {(isFetching || failureCount > 3) &&
        [...Array(10).keys()].map((x) => (
          <Skeleton className="m-1" key={x} height={24} width="80%" />
        ))}
      {!isFetching && transactions.map((x) => <TransactionRow key={x.id} values={x} dense />)}
    </>
  )
}
