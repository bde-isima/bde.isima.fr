import { useQuery } from 'blitz'
import Typography, { TypographyTypeMap } from '@mui/material/Typography'

type BalanceProps = {
  getQuery: any
  queryArgs?: any
  variant?: TypographyTypeMap['props']['variant']
}

export default function Balance({ getQuery, queryArgs = {}, variant = 'h3' }: BalanceProps) {
  const [user] = useQuery(getQuery, queryArgs)
  const balance = (user as any).balance

  return (
    <Typography
      className={balance >= 0 ? 'text-green-600' : 'text-red-700'}
      variant={variant}
      align="center"
    >
      {balance >= 0 ? `+${balance.toFixed(2)}` : `${balance.toFixed(2)}`} €
    </Typography>
  )
}
