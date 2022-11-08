import { useState } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

  const [withNullBalance, setWithNullBalance] = useState(false);

  const [negatives, positives, neutral] = [data?.negatives || 0, data?.positives || 0, data?.neutral || 0];

  let labels = ['Positifs', 'Négatifs'];
  let chartData = [positives, negatives];
  let backgroundColor = [theme.palette.success.main, theme.palette.error.main];
  let borderColor = [theme.palette.success.dark, theme.palette.error.dark];

  if (withNullBalance) {
    labels.push('Nuls');
    chartData.push(neutral);
    backgroundColor.push(theme.palette.warning.main);
    borderColor.push(theme.palette.warning.dark);
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between content-center mb-4">
        <Typography className="my-auto h-min" variant="h6">
          Bilan des soldes
        </Typography>
        <FormControlLabel
          className="mx-0"
          control={<Checkbox onChange={(event) => setWithNullBalance(event.target.checked)} />}
          label="Inclure les soldes nul"
        />
      </div>

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
          labels,
          datasets: [
            {
              data: chartData,
              backgroundColor,
              borderColor,
              borderWidth: 1
            }
          ]
        }}
      />
    </div>
  );
}
