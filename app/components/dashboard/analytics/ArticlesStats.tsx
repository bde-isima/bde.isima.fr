import { useState } from "react"
import { useQuery } from "blitz"
import { subDays } from "date-fns"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import Typography from "@material-ui/core/Typography"
import { VictoryBar, VictoryChart, VictoryTheme } from "victory"

import getArticles from "app/entities/articles/queries/getArticles"

const now = new Date()

export default function ArticlesStats() {
  const [period, setPeriod] = useState(31)

  const [data] = useQuery(getArticles, {
    include: { Transaction: true },
    where: { Transaction: { some: { createdAt: { lte: now, gte: subDays(now, period) } } } },
  })

  const handleChange = (event) => setPeriod(event.target.value)

  return (
    <div className="flex flex-col">
      <div className="flex flex-grow justify-around">
        <Typography variant="h6">Ventes d'articles</Typography>

        <Select value={period} onChange={handleChange}>
          <MenuItem value={7}>Cette semaine</MenuItem>
          <MenuItem value={31}>Ce mois</MenuItem>
          <MenuItem value={365}>Cette année</MenuItem>
        </Select>
      </div>

      <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 10 }}>
        <VictoryBar
          horizontal
          animate={{ duration: 300 }}
          data={data?.articles}
          x="name"
          y="Transaction.length"
        />
      </VictoryChart>
    </div>
  )
}
