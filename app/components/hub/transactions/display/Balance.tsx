import Typography from "@material-ui/core/Typography"

export default function Balance({ balance, variant }) {
  return (
    <Typography
      className={balance >= 0 ? "text-green-600" : "text-red-700"}
      variant={variant}
      align="center"
    >
      {(balance >= 0 ? `+${balance.toFixed(2)}` : `${balance.toFixed(2)}`)} €
    </Typography>
  )
}
