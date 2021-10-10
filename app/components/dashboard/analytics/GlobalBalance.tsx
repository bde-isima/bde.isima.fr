import { useQuery } from 'blitz'
import Typography from '@mui/material/Typography'
import { VictoryChart, VictoryPie, VictoryTheme, VictoryAxis } from 'victory'

import { useTheme } from 'app/core/styles/theme'
import getAggregatedBalance from 'app/entities/users/queries/getAggregatedBalance'

export default function GlobalBalance() {
  const theme = useTheme()
  const [data] = useQuery(getAggregatedBalance, {})

  const [negatives, positives] = [data?.negatives || 0, data?.positives || 0]

  const total = negatives + positives
  const negRatio = (negatives * 100) / total
  const posRatio = (positives * 100) / total

  return (
    <div className="flex flex-col">
      <Typography variant="h6">Bilan des soldes</Typography>

      <VictoryChart padding={{ left: 90, top: 50, right: 90, bottom: 50 }}>
        <VictoryPie
          standalone={true}
          theme={VictoryTheme.material}
          style={{ labels: { fill: theme.palette.text.primary } }}
          colorScale={['#C91F37', '#32CD32']}
          animate={{ duration: 300 }}
          data={[
            { x: `${negatives} négatifs`, y: negRatio },
            { x: `${positives} positifs`, y: posRatio },
          ]}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
        />
      </VictoryChart>
    </div>
  )
}
