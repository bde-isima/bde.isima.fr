import { Fragment } from 'react'
import isValid from 'date-fns/isValid'
import { useInfiniteQuery } from 'blitz'
import Button from '@mui/material/Button'
import { useTheme, useMediaQuery } from '@mui/material'

import getTransactions from 'app/entities/transactions/queries/getTransactions'
import TransactionRow from 'app/components/hub/transactions//display/TransactionRow'

type HistoryProps = {
  userId?: string
  minDate: Date
  maxDate: Date
}

export default function History({ userId, minDate, maxDate }: HistoryProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'))

  const AND =
    isValid(minDate) && isValid(maxDate)
      ? [{ createdAt: { gte: minDate } }, { createdAt: { lte: maxDate } }]
      : []

  const [groupedTransactions, { isFetching, isFetchingMore, fetchMore, canFetchMore }] =
    useInfiniteQuery(
      getTransactions,
      (
        page = {
          take: 10,
          skip: 0,
        }
      ) => ({ ...page, where: { userId, AND }, orderBy: { createdAt: 'desc' } }),
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
              <TransactionRow
                key={t.id}
                values={t}
                type={{ visible: !fullScreen, size: 2 }}
                description={{ visible: true, size: 6 }}
                amount={{ visible: true, size: fullScreen ? 3 : 2 }}
                prevBalance={{ visible: true, size: fullScreen ? 3 : 2 }}
              />
            ))}
          </Fragment>
        ))}

      <div className="flex flex-grow" />

      <Button
        className="my-4 w-full"
        onClick={() => fetchMore()}
        color="inherit"
        variant="outlined"
        disabled={!canFetchMore || !!isFetchingMore}
      >
        {isFetching || isFetchingMore
          ? 'Chargement ...'
          : canFetchMore
          ? 'Charger plus'
          : 'Plus rien à charger'}
      </Button>
    </>
  )
}
