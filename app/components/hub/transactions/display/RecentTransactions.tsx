import { useQuery } from "blitz"

import { useCurrentUser } from "app/hooks/useCurrentUser"
import getTransactions from "app/entities/transactions/queries/getTransactions"
import TransactionRow from "app/components/hub/transactions/display/TransactionRow"

export default function RecentTransactions() {
  const [user] = useCurrentUser()

  const [{ transactions }] = useQuery(getTransactions, {
    where: { userId: user?.id },
    take: 10,
    orderBy: { createdAt: "desc" },
  })

  return (
    <>
      {transactions.map((x) => (
        <TransactionRow key={x.id} values={x} dense />
      ))}
    </>
  )
}
