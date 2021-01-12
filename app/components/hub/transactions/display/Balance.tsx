import Typography from "@material-ui/core/Typography"

import { useCurrentUser } from "app/hooks/useCurrentUser"

export default function Balance() {
  const [user] = useCurrentUser()
  const balance = (user as any).balance

  return (
    <Typography
      className={balance >= 0 ? "text-green-600" : "text-red-700"}
      variant="h3"
      align="center"
    >
      {balance >= 0 ? `+${balance.toFixed(2)}` : `${balance.toFixed(2)}`} €
    </Typography>
  )
}
