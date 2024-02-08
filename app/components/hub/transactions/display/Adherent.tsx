import Typography, { TypographyTypeMap } from '@mui/material/Typography';

import { useQuery } from '@blitzjs/rpc';

type BalanceProps = {
  getQuery: any;
  queryArgs?: any;
  variant?: TypographyTypeMap['props']['variant'];
};

export default function Adherent({ getQuery, queryArgs = {}, variant = 'h5' }: BalanceProps) {
  const [user] = useQuery(getQuery, queryArgs);
  const adherent = (user as any).is_member;

  return (
    <Typography color={adherent ? 'success.main' : 'error.main'} variant={variant} align="center">
      {adherent ? 'Cotisant' : 'Non-Cotisant'}
    </Typography>
  );
}
