import { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js';
import { subDays } from 'date-fns';
import { Bar } from 'react-chartjs-2';

import { useQuery } from '@blitzjs/rpc';

import { useTheme } from 'app/core/styles/theme';
import getArticlesUse from 'app/entities/articles/queries/getArticlesUse';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const now = new Date();

export default function ArticlesStats() {
  const theme = useTheme();
  const [period, setPeriod] = useState(31);

  const [data] = useQuery(getArticlesUse, {
    range: { lte: now, gte: subDays(now, period) },
    count: 10
  });

  console.log(data);

  const handleChange = (event: SelectChangeEvent<number>) => setPeriod(event.target.value as number);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow justify-around">
        <Typography variant="h6">Ventes d&apos;articles</Typography>

        <Select value={period} onChange={handleChange}>
          <MenuItem value={7}>Cette semaine</MenuItem>
          <MenuItem value={31}>Ce mois</MenuItem>
          <MenuItem value={365}>Cette année</MenuItem>
        </Select>
      </div>

      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }}
        data={{
          labels: data.map((a) => {
            return a.article.name;
          }),
          datasets: [
            {
              data: data.map((a) => {
                return a.count;
              }),
              backgroundColor: theme.palette.primary.main
            }
          ]
        }}
      />
    </div>
  );
}
