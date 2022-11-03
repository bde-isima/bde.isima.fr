import { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { subDays } from 'date-fns';
import { Article, Transaction } from 'db';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';

import { useQuery } from '@blitzjs/rpc';

import { useTheme } from 'app/core/styles/theme';
import getArticles from 'app/entities/articles/queries/getArticles';

const now = new Date();

export default function ArticlesStats() {
  const theme = useTheme();
  const [period, setPeriod] = useState(31);

  const [data] = useQuery(getArticles, {
    include: { Transaction: true },
    where: { Transaction: { some: { createdAt: { lte: now, gte: subDays(now, period) } } } }
  });

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

      <VictoryChart domainPadding={100}>
        <VictoryBar
          style={{
            data: { fill: theme.palette.primary.main },
            labels: { fill: theme.palette.text.primary }
          }}
          animate={{ duration: 300 }}
          data={data?.articles.map((a: Article & { Transaction: Transaction[] }, i: number) => ({
            x: i + 1,
            y: a.Transaction.length,
            label: a.name
          }))}
          labelComponent={<VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end" />}
        />
      </VictoryChart>
    </div>
  );
}
