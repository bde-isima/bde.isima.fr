import { BlitzPage } from "blitz"
import Layout from "app/layouts/Layout"

import Leaderboard from "app/components/hub/leaderboard/Leaderboard"

const LeaderboardIndex: BlitzPage = () => {
  return (
    <Leaderboard />
  )
}

LeaderboardIndex.getLayout = (page) => <Layout title="Leaderboard ZZ">{page}</Layout>

export default LeaderboardIndex
