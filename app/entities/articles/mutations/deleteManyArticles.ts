import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type DeleteManyArticleInput = Pick<Prisma.ArticleDeleteManyArgs, 'where'>;

export default resolver.pipe(resolver.authorize(['*', 'bde']), async ({ where }: DeleteManyArticleInput) => {
  return await db.article.deleteMany({ where });
});
