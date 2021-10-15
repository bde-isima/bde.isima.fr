import { useState } from 'react'
import { useQuery } from 'blitz'
import { subDays } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel } from 'victory'

import { Article, Transaction } from 'db'
import { useTheme } from 'app/core/styles/theme'
import getArticles from 'app/entities/articles/queries/getArticles'

const now = new Date()

export default function ArticlesStats() {
  const theme = useTheme()
  const [period, setPeriod] = useState(31)

  const [data] = useQuery(getArticles, {
    include: { Transaction: true },
    where: { Transaction: { some: { createdAt: { lte: now, gte: subDays(now, period) } } } },
  })

  const handleChange = (event: SelectChangeEvent<number>) => setPeriod(event.target.value as number)

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
          theme={VictoryTheme.material}
          style={{ data: { fill: theme.palette.text.primary } }}
          animate={{ duration: 300 }}
          data={data?.articles.map((a: Article & { Transaction: Transaction[] }, i: number) => ({
            x: i + 1,
            y: a.Transaction.length,
            label: a.name,
          }))}
          labelComponent={<VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end" />}
        />
      </VictoryChart>
    </div>
  )
}
