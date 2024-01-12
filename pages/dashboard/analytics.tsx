import { Suspense } from 'react';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Chart } from 'chart.js';

import { BlitzPage, Routes } from '@blitzjs/next';

import ArticlesStats from 'app/components/dashboard/analytics/ArticlesStats';
import GlobalBalance from 'app/components/dashboard/analytics/GlobalBalance';
import { redirectAuthenticatedTo } from 'app/components/nav/dashboard/bde-config';
import getDashboardNav from 'app/components/nav/dashboard/getDashboardNav';
import { useTheme } from 'app/core/styles/theme';

function ApplyChartColorTheme() {
  let theme = useTheme();

  Chart.defaults.color = theme.palette.text.primary;
  Chart.defaults.borderColor = theme.palette.divider;
}

const Analytics: BlitzPage = () => {
  ApplyChartColorTheme();

  const AnalyticsCard = ({ children }) => (
    <Grid item xs={12} md={6}>
      <Card className="p-4 h-full">
        <Suspense fallback="Récupération des données ...">{children}</Suspense>
      </Card>
    </Grid>
  );

  return (
    <Grid container spacing={5}>
      <AnalyticsCard>
        <GlobalBalance />
      </AnalyticsCard>

      <AnalyticsCard>
        <ArticlesStats />
      </AnalyticsCard>
    </Grid>
  );
};

Analytics.suppressFirstRenderFlicker = true;
Analytics.authenticate = { redirectTo: Routes.Login() };
Analytics.redirectAuthenticatedTo = redirectAuthenticatedTo(Routes.Analytics());
Analytics.getLayout = (page) => getDashboardNav(page, 'Statistiques');

export default Analytics;
