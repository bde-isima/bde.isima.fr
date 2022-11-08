import Typography from '@mui/material/Typography';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { useQuery } from '@blitzjs/rpc';

import { useTheme } from 'app/core/styles/theme';
import getAggregatedBalance from 'app/entities/users/queries/getAggregatedBalance';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GlobalBalance() {
  const theme = useTheme();
  const [data] = useQuery(getAggregatedBalance, {});

  const [negatives, positives] = [data?.negatives || 0, data?.positives || 0];

  return (
    <div className="flex flex-col h-full">
      <Typography variant="h6">Bilan des soldes</Typography>

      <Pie
        className="max-h-60 mt-auto"
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'right' as const
            }
          }
        }}
        data={{
          labels: ['Positifs', 'Négatifs'],
          datasets: [
            {
              data: [positives, negatives],
              backgroundColor: [theme.palette.success.main, theme.palette.error.main],
              borderColor: [theme.palette.success.dark, theme.palette.error.dark]
            }
          ]
        }}
      />
    </div>
  );
}
