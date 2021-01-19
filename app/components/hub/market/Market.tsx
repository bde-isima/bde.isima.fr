import { useQuery } from "blitz"

import MarketItem from "app/components/hub/market/MarketItem"
import getArticles from "app/entities/articles/queries/getArticles"

export default function Market() {
  const [{ articles }] = useQuery(
    getArticles,
    { where: { is_enabled: true } },
    { refetchOnWindowFocus: false }
  )

  return (
    <>
      {articles.map((article, idx) => (
        <MarketItem key={idx} article={article} />
      ))}
    </>
  )
}
