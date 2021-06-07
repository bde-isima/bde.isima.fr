import { Suspense } from 'react'
import { format } from 'date-fns'
import Tooltip from '@material-ui/core/Tooltip'
import Skeleton from '@material-ui/core/Skeleton'
import Typography from '@material-ui/core/Typography'
import Grid, { GridSize } from '@material-ui/core/Grid'

import TrendingUp from 'mdi-material-ui/TrendingUp'
import TrendingDown from 'mdi-material-ui/TrendingDown'

import { Transaction } from 'db'
import TransactionAvatar from './TransactionAvatar'

type ColumnType = {
  visible: boolean
  size?: GridSize
}

type TransactionProps = {
  values: Transaction
  type: ColumnType
  description: ColumnType
  amount: ColumnType
  prevBalance: ColumnType
  dense?: boolean
}

export default function TransactionRow({
  values,
  type,
  description,
  amount,
  prevBalance,
  dense = false,
}: TransactionProps) {
  const isPositive = values.type === 'CREDIT'

  return (
    <Grid className={dense ? 'my-1' : 'my-2'} container>
      {type.visible && (
        <Grid
          className={isPositive ? 'text-green-600' : 'text-red-700'}
          container
          item
          xs={type.size}
          justifyContent="center"
          alignContent="center"
        >
          {!dense && values.emitterId ? (
            <Suspense fallback={<Skeleton variant="circular" width={40} height={40} />}>
              <TransactionAvatar id={values.emitterId} />
            </Suspense>
          ) : isPositive ? (
            <TrendingUp />
          ) : (
            <TrendingDown />
          )}
        </Grid>
      )}

      {description.visible && (
        <Grid
          container
          item
          xs={description.size}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title={dense ? `${values.description || 'Aucune description'}` : ''}>
            <div className={`${dense ? 'w-32' : 'w-full'} flex flex-col overflow-x-hidden`}>
              <Typography variant="caption" align="left" noWrap={dense}>
                {values.description || 'Aucune description'}
              </Typography>
              {!dense && (
                <Typography variant="caption" align="left" color="textSecondary">
                  {format(values.createdAt, 'dd/MM/yyyy - HH:mm')}
                </Typography>
              )}
            </div>
          </Tooltip>
        </Grid>
      )}

      {amount.visible && (
        <Grid container item xs={amount.size} justifyContent="center" alignItems="center">
          <Typography className={isPositive ? 'text-green-600' : 'text-red-700'} variant="caption">
            {isPositive ? '+' : '-'}
            {values.amount.toFixed(2)} €
          </Typography>
        </Grid>
      )}

      {prevBalance.visible && (
        <Grid container item xs={prevBalance.size} justifyContent="flex-end" alignItems="center">
          <Typography variant="caption" color="textSecondary">
            {values.prevBalance.toFixed(2)} €
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
