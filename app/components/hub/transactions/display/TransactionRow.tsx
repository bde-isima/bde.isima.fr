import { Suspense } from "react"
import { format } from "date-fns"
import Grid from "@material-ui/core/Grid"
import { useTheme } from "@material-ui/core"
import Tooltip from "@material-ui/core/Tooltip"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"

import TrendingUp from "mdi-material-ui/TrendingUp"
import TrendingDown from "mdi-material-ui/TrendingDown"

import { Transaction } from "db"
import TransactionAvatar from "./TransactionAvatar"

type TransactionProps = {
  values: Transaction
  dense?: boolean
}

export default function TransactionRow({ values, dense = false }: TransactionProps) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  const isPositive = values.type === "CREDIT"

  return (
    <Grid className={`${dense ? "my-1" : "my-2"}`} container>
      {!fullScreen && (
        <Grid
          className={isPositive ? "text-green-600" : "text-red-700"}
          container
          item
          xs={dense ? 3 : 2}
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

      <Grid container item xs={fullScreen ? 8 : 6} direction="column" justifyContent="center">
        {!dense ? (
          <>
            <Typography variant="caption" align="center">
              {values.description || "Aucune description"}
            </Typography>
            <Typography variant="caption" align="center" color="textSecondary">
              {format(values.createdAt, "dd/MM/yyyy - HH:mm")}
            </Typography>
          </>
        ) : (
          <Tooltip title={`${values.description || "Aucune description"}`}>
            <Typography variant="caption" align="center">
              {values?.description?.substring(0, 16) || "Aucune description"}
            </Typography>
          </Tooltip>
        )}
      </Grid>

      <Grid container item xs={dense ? 3 : 2} justifyContent="center" alignItems="center">
        <Typography className={isPositive ? "text-green-600" : "text-red-700"} variant="caption">
          {isPositive ? "+" : "-"}
          {values.amount.toFixed(2)} €
        </Typography>
      </Grid>

      {!dense && (
        <Grid container item xs={2} justifyContent="center" alignItems="center">
          <Typography variant="caption" color="textSecondary">
            {values.prevBalance.toFixed(2)} €
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
