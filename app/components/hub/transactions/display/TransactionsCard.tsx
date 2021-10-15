import { Suspense } from 'react'
import Card from '@mui/material/Card'
import Badge from '@mui/material/Badge'
import Button from '@mui/material/Button'
import Skeleton from '@mui/material/Skeleton'
import { useAuthenticatedSession } from 'blitz'
import Typography from '@mui/material/Typography'
import ButtonGroup from '@mui/material/ButtonGroup'

import LocalAtm from '@mui/icons-material/LocalAtmTwoTone'
import CompareArrows from '@mui/icons-material/CompareArrowsTwoTone'
import History from '@mui/icons-material/HistoryTwoTone'

import Balance from 'app/components/hub/transactions/display/Balance'
import getCurrentUser from 'app/entities/users/queries/getCurrentUser'
import RecentTransactions from 'app/components/hub/transactions/display/RecentTransactions'

export default function TransactionsCard({ openTransfer, openHistory, openTopUp }) {
  const session = useAuthenticatedSession()

  const FallbackComponent = [...Array(10).keys()].map((x) => (
    <Skeleton className="m-1" key={x} height={24} width="80%" />
  ))

  return (
    <Card className="py-6 px-4 rounded-md rounded-b-none" square>
      <div className="flex flex-col justify-center items-center">
        <Suspense fallback={<Skeleton width="60%" height={55} />}>
          <Balance getQuery={getCurrentUser} />
        </Suspense>

        <Typography className="my-2" variant="subtitle2" color="textSecondary" gutterBottom>
          Solde carte n°{session.card}
        </Typography>

        <Suspense fallback={FallbackComponent}>
          <RecentTransactions />
        </Suspense>

        <ButtonGroup
          className="my-4"
          variant="outlined"
          aria-label="Groupe de bouton pour le transfert d'argent et consulter son historique"
          color="inherit"
        >
          <Button startIcon={<CompareArrows />} aria-label="Transférer" onClick={openTransfer}>
            Envoyer
          </Button>

          <Button startIcon={<History />} aria-label="Voir l'historique" onClick={openHistory}>
            Historique
          </Button>
        </ButtonGroup>

        <Badge>
          <Button
            variant="outlined"
            startIcon={<LocalAtm />}
            aria-label="Recharger"
            onClick={openTopUp}
            color="inherit"
          >
            Recharger
          </Button>
        </Badge>
      </div>
    </Card>
  )
}
