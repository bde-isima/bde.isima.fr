import { useInfiniteQuery } from 'blitz'

import getTransactions from 'app/entities/transactions/queries/getTransactions'

export default function useHistory(userId: string | undefined) {
    return useInfiniteQuery(getTransactions, (
        page = {
            take: 10,
            skip: 0,
        }) => ({ ...page, where: { userId }, orderBy: { createdAt: "desc" } }),
        {
            getFetchMore: (lastGroup) => lastGroup.nextPage,
            enabled: Boolean(userId),
        }
    )
}