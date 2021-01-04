import { useQuery } from "react-query"
import Typography from "@material-ui/core/Typography"
import { VictoryChart, VictoryPie, VictoryTheme } from "victory"

import getAggregatedBalance from "app/entities/users/queries/getAggregatedBalance"

export default function GlobalBalance() {
  const { data } = useQuery("getAggregatedBalance", getAggregatedBalance)

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
          colorScale={["#C91F37", "#32CD32"]}
          animate={{ duration: 300 }}
          data={[
            { x: `${negatives} négatifs`, y: negRatio },
            { x: `${positives} positifs`, y: posRatio },
          ]}
        />
      </VictoryChart>
    </div>
  )
}
