import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import PageTitle from 'app/core/layouts/PageTitle'
import ArticlesStats from 'app/components/dashboard/analytics/ArticlesStats'
import GlobalBalance from 'app/components/dashboard/analytics/GlobalBalance'

export default function Analytics() {
  return (
    <>
      <PageTitle title="Statistiques" />

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Card className="p-4 h-full">
            <Suspense fallback="Récupération des données ...">
              <GlobalBalance />
            </Suspense>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className="p-4 h-full">
            <Suspense fallback="Récupération des données ...">
              <ArticlesStats />
            </Suspense>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
