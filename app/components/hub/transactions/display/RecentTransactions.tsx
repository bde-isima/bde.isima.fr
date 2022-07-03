import { useQuery } from "@blitzjs/rpc";

import { useCurrentUser } from 'app/entities/hooks/useCurrentUser'
import getTransactions from 'app/entities/transactions/queries/getTransactions'
import TransactionRow from 'app/components/hub/transactions/display/TransactionRow'

export default function RecentTransactions() {
  const [user] = useCurrentUser()

  const [{ transactions }] = useQuery(getTransactions, {
    take: 10,
    skip: 0,
    where: { userId: user?.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      {transactions.map((x) => (
        <TransactionRow
          key={x.id}
          values={x}
          type={{ visible: true, size: 3 }}
          description={{ visible: true, size: 6 }}
          amount={{ visible: true, size: 3 }}
          prevBalance={{ visible: false }}
          dense
        />
      ))}
    </>
  )
}
