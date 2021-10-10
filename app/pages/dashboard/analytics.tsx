import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import { BlitzPage, Routes } from 'blitz'

import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav'
import ArticlesStats from 'app/components/dashboard/analytics/ArticlesStats'
import GlobalBalance from 'app/components/dashboard/analytics/GlobalBalance'
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config'

const Analytics: BlitzPage = () => {
  return (
    <>
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

Analytics.suppressFirstRenderFlicker = true
Analytics.authenticate = { redirectTo: Routes.Login() }
Analytics.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Planning())
Analytics.getLayout = (page) => getDashboardNav(page, 'Statistiques')

export default Analytics
