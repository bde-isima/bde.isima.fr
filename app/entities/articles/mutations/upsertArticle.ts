import { Ctx } from 'blitz';
import db, { Prisma } from 'db';

import { resolver } from '@blitzjs/rpc';

type UpsertArticleInput = Pick<Prisma.ArticleUpsertArgs, 'where' | 'create' | 'update'>;

export default resolver.pipe(
  resolver.authorize(['*', 'bde']),
  async ({ where, create, update }: UpsertArticleInput, _: Ctx) => {
    return await db.article.upsert({ where, update, create });
  }
);
