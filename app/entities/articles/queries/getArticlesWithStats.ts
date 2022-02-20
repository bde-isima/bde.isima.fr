import { subDays, subMonths, subYears } from 'date-fns';
import { resolver } from 'blitz'
import db, { Prisma } from 'db'

interface ArticleWithStatsPayload extends Prisma.ArticleGetPayload<{}> {
  weekCount: number,
  monthCount: number,
  yearCount: number,
  totalCount: number,
}

export type ArticleWithStatsOutputType = {
  articles: ArticleWithStatsPayload[],
}

export default resolver.pipe(resolver.authorize(['*', 'bde']), async (): Promise<ArticleWithStatsOutputType> => {
  const todayDate = new Date()
  const lastWeekDate = subDays(todayDate, 7)
  const lastMonthDate = subMonths(todayDate, 1)
  const lastYearDate = subYears(todayDate, 1)

  const articles = await db.$queryRaw<ArticleWithStatsPayload[]>`
      SELECT
       "Article"."id" AS "id",
       "Article"."name" AS "name",
       "Article"."price" AS "price",
       "Article"."member_price" AS "member_price",
       "Article"."image" AS "image",
       "Article"."is_enabled" AS "is_enabled",
       "Article"."createdAt" AS "createdAt",
       "Article"."updatedAt" AS "updatedAt",
       week.count AS "weekCount",
       month.count AS "monthCount",
       year.count AS "yearCount",
       total.count AS "totalCount"
      FROM "Article"
      LEFT JOIN (
        SELECT "Transaction"."articleId", COUNT("Transaction"."id") AS count FROM "Transaction"
        GROUP BY "Transaction"."articleId"
      ) total ON "Article"."id" = total."articleId"
      LEFT JOIN (
        SELECT "Transaction"."articleId", COUNT("Transaction"."id") AS count FROM "Transaction"
        WHERE "Transaction"."createdAt" >= ${lastWeekDate}::date AND "Transaction"."createdAt" <= ${todayDate}::date
        GROUP BY "Transaction"."articleId"
      ) week ON "Article".id = "week"."articleId"
      LEFT JOIN (
        SELECT "Transaction"."articleId", COUNT("Transaction"."id") AS count FROM "Transaction"
        WHERE "Transaction"."createdAt" >= ${lastMonthDate}::date AND "Transaction"."createdAt" <= ${todayDate}::date
        GROUP BY "Transaction"."articleId"
      ) month ON "Article".id = "month"."articleId"
      LEFT JOIN (
        SELECT "Transaction"."articleId", COUNT("Transaction"."id") FROM "Transaction"
        WHERE "Transaction"."createdAt" >= ${lastYearDate}::date AND "Transaction"."createdAt" <= ${todayDate}::date
        GROUP BY "Transaction"."articleId"
      ) year ON "Article".id = "year"."articleId"
      ORDER BY "Article"."name"
    `

  return {
    articles,
  }
})
