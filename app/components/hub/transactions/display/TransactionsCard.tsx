import { Suspense } from "react"
import { useSession } from "blitz"
import Card from "@material-ui/core/Card"
import Badge from "@material-ui/core/Badge"
import Button from "@material-ui/core/Button"
import Skeleton from "@material-ui/core/Skeleton"
import Typography from "@material-ui/core/Typography"
import ButtonGroup from "@material-ui/core/ButtonGroup"

import CashPlus from "mdi-material-ui/CashPlus"
import CubeSend from "mdi-material-ui/CubeSend"
import HistoryIcon from "mdi-material-ui/History"

import Balance from "app/components/hub/transactions/display/Balance"
import RecentTransactions from "app/components/hub/transactions/display/RecentTransactions"

export default function TransactionsCard({ openTransfer, openHistory, openTopUp }) {
  const session = useSession()

  const FallbackComponent = [...Array(10).keys()].map((x) => (
    <Skeleton className="m-1" key={x} height={24} width="80%" />
  ))

  return (
    <Card className="py-6 mb-4 px-4">
      <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<Skeleton width="60%" height={55} />}>
          <Balance />
        </Suspense>

        <Typography className="my-2" variant="subtitle2" color="textSecondary" gutterBottom>
          Solde carte n°{session.card}
        </Typography>

        <Suspense fallback={FallbackComponent}>
          <RecentTransactions />
        </Suspense>

        <ButtonGroup
          className="my-4"
          aria-label="Groupe de bouton pour le transfert d'argent et consulter son historique"
        >
          <Button
            variant="outlined"
            startIcon={<CubeSend />}
            aria-label="Transférer"
            onClick={openTransfer}
          >
            Envoyer
          </Button>

          <Button
            variant="outlined"
            startIcon={<HistoryIcon />}
            aria-label="Voir l'historique"
            onClick={openHistory}
          >
            Historique
          </Button>
        </ButtonGroup>

        <Badge>
          <Button
            variant="outlined"
            startIcon={<CashPlus />}
            aria-label="Recharger"
            onClick={openTopUp}
          >
            Recharger
          </Button>
        </Badge>
      </div>
    </Card>
  )
}
