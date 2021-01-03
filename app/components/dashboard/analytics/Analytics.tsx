import { Suspense } from "react"
import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"

import ArticlesStats from "./ArticlesStats"
import GlobalBalance from "./GlobalBalance"

export default function Analytics() {
  return (
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
  )
}
