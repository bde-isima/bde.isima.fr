import Typography, { TypographyTypeMap } from '@mui/material/Typography';

import { useQuery } from '@blitzjs/rpc';

type BalanceProps = {
  getQuery: any;
  queryArgs?: any;
  variant?: TypographyTypeMap['props']['variant'];
};

export default function Balance({ getQuery, queryArgs = {}, variant = 'h3' }: BalanceProps) {
  const [user] = useQuery(getQuery, queryArgs);
  const balance = (user as any).balance;

  return (
    <Typography color={balance >= 0 ? 'success.main' : 'error.main'} variant={variant} align="center">
      {balance >= 0 ? `+${balance.toFixed(2)}` : `${balance.toFixed(2)}`} €
    </Typography>
  );
}
