import { Article } from '@prisma/client';
import { resolver } from 'blitz';
import db, { Prisma } from 'db';

type GetArticlesInput = Pick<Prisma.ArticleFindManyArgs, 'include' | 'where' | 'orderBy' | 'skip' | 'take'>;

export default resolver.pipe(
  resolver.authorize(),
  async ({ include, where, orderBy, skip = 0, take }: GetArticlesInput) => {
    let whereStr = '';
    let sep = '';
    for (const index in where?.OR) {
      whereStr += `${sep}LOWER(name) LIKE LOWER('%${where?.OR[index].name.contains}%')`;
      sep = ' OR ';
    }

    if (whereStr) {
      whereStr = ` AND ${whereStr}`;
    }

    const articles = await db.$queryRaw<Article[]>(
      Prisma.sql([`SELECT * FROM "Article" WHERE quantity <= min_quantity${whereStr}`])
    );

    const count = articles.length;
    const hasMore = typeof take === 'number' ? skip + take < count : false;
    const nextPage = hasMore ? { take, skip: skip + take! } : null;

    return {
      articles,
      nextPage,
      hasMore,
      count
    };
  }
);
