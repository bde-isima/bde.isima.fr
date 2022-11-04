import { Suspense } from 'react';

import Grid, { GridSize } from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { Transaction } from 'db';

import TrendingDown from '@mui/icons-material/TrendingDownTwoTone';
import TrendingUp from '@mui/icons-material/TrendingUpTwoTone';

import TransactionAvatar from './TransactionAvatar';

type ColumnType = {
  visible: boolean;
  size?: GridSize;
};

type TransactionProps = {
  values: Transaction;
  type: ColumnType;
  description: ColumnType;
  amount: ColumnType;
  prevBalance: ColumnType;
  dense?: boolean;
};

export default function TransactionRow({
  values,
  type,
  description,
  amount,
  prevBalance,
  dense = false
}: TransactionProps) {
  const isPositive = values.type === 'CREDIT';

  return (
    <Grid className={dense ? 'my-1' : 'my-2'} container>
      {type.visible && (
        <Grid container item xs={type.size} justifyContent="center" alignContent="center">
          {!dense && values.emitterId ? (
            <Suspense fallback={<Skeleton variant="circular" width={40} height={40} />}>
              <TransactionAvatar id={values.emitterId} />
            </Suspense>
          ) : isPositive ? (
            <TrendingUp color="success" />
          ) : (
            <TrendingDown color="error" />
          )}
        </Grid>
      )}

      {description.visible && (
        <Grid container item xs={description.size} direction="column" justifyContent="center" alignItems="center">
          <Tooltip title={dense ? `${values.description || 'Aucune description'}` : ''}>
            <div className={`${dense ? 'w-32' : 'w-full'} flex flex-col overflow-x-hidden`}>
              <Typography variant="caption" align="left" noWrap={dense}>
                {values.description || 'Aucune description'}
              </Typography>
              {!dense && (
                <Typography variant="caption" align="left">
                  {format(values.createdAt, 'dd/MM/yyyy - HH:mm')}
                </Typography>
              )}
            </div>
          </Tooltip>
        </Grid>
      )}

      {amount.visible && (
        <Grid container item xs={amount.size} justifyContent="center" alignItems="center">
          <Typography color={isPositive ? 'success.main' : 'error.main'} variant="caption">
            {isPositive ? '+' : '-'}
            {values.amount.toFixed(2)} €
          </Typography>
        </Grid>
      )}

      {prevBalance.visible && (
        <Grid container item xs={prevBalance.size} justifyContent="flex-end" alignItems="center">
          <Typography variant="caption">{values.prevBalance.toFixed(2)} €</Typography>
        </Grid>
      )}
    </Grid>
  );
}
