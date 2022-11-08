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
  const [count, setCount] = useState(10);

  const [data] = useQuery(getArticlesUse, {
    range: { lte: now, gte: subDays(now, period) },
    count
  });

  const handleChange = (event: SelectChangeEvent<number>) => setPeriod(event.target.value as number);
  const handleChangeNumber = (event: SelectChangeEvent<number>) => {
    let count = event.target.value as number;

    return setCount(count <= 0 ? 1 : count);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-grow justify-around content-center mb-4">
        <Typography className="my-auto h-min" variant="h6">
          Vente d&apos;articles
        </Typography>

        <Select className="ml-auto" value={period} onChange={handleChange}>
          <MenuItem value={7}>Cette semaine</MenuItem>
          <MenuItem value={31}>Ce mois</MenuItem>
          <MenuItem value={365}>Cette année</MenuItem>
        </Select>

        <Select className="ml-2" value={count} onChange={handleChangeNumber}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </div>

      <Bar
        className="mt-auto"
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
              backgroundColor: theme.palette.primary.main,
              borderColor: theme.palette.primary.dark
            }
          ]
        }}
      />
    </div>
  );
}
