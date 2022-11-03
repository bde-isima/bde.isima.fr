import { useQuery } from '@blitzjs/rpc';

import MarketItem from 'app/components/hub/market/MarketItem';
import getArticles from 'app/entities/articles/queries/getArticles';
import { useCurrentUser } from 'app/entities/hooks/useCurrentUser';

export default function Market() {
  const [{ articles }] = useQuery(
    getArticles,
    { where: { is_enabled: true }, orderBy: { name: 'asc' } },
    { refetchOnWindowFocus: false }
  );

  const [user] = useCurrentUser();

  return (
    <>
      {articles.map((article, idx) => (
        <MarketItem key={idx} article={article} member={user?.is_member} />
      ))}
    </>
  );
}
