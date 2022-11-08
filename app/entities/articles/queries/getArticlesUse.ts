import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type GetArticlesUseInput = {
  range: Prisma.DateTimeFilter;
  count: number;
};

export default resolver.pipe(resolver.authorize(), async ({ range, count }: GetArticlesUseInput) => {
  const transactions = await db.transaction.groupBy({
    by: ['articleId'],
    _count: { id: true },
    where: { createdAt: range },
    orderBy: {
      _count: {
        id: 'desc'
      }
    },
    take: count
  });

  let articles = Array();

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].articleId) {
      let article = await db.article.findFirst({
        where: { id: transactions[i].articleId! }
      });

      if (article) {
        articles.push({
          article,
          count: transactions[i]._count.id
        });
      }
    }
  }

  console.log(articles);

  return articles;
});
