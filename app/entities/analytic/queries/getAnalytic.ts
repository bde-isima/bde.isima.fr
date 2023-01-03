import db, { Analytic, Article, Prisma, User, UserStats } from 'db';

import { resolver } from '@blitzjs/rpc';

type FindUniqueAnalyticInput = Pick<Prisma.AnalyticFindUniqueArgs, 'where'> & { withLeaderBoard: Boolean };

type UserWithStats = User & { userStats: UserStats | null };

function getLeader(users: UserWithStats[], article: Article): any {
  let max = 0;
  let leader: UserWithStats | null = null;
  users.forEach((u) => {
    if (u.userStats && u.userStats.articlesStats && u.userStats.articlesStats[article.id] >= max) {
      max = u.userStats.articlesStats[article.id];
      leader = u;
    }
  });
  return leader;
}

async function updateUserStats(tag: string) {
  const articles = await db.article.findMany({
    where: { is_enabled: true }
  });

  const users = await db.user.findMany({
    where: { is_enabled: true },
    include: { userStats: true }
  });

  const data = articles.map((a) => {
    const leader = getLeader(users, a);
    return {
      articleId: a.id,
      articleImage: a.image,
      articleName: a.name,
      unitsNb: leader ? leader.userStats.articlesStats[a.id] : 0,
      leaderName: leader ? leader?.nickname ?? `${leader.lastname} ${leader.firstname}` : null,
      leaderImage: leader ? leader?.image : null
    };
  });

  await db.analytic.upsert({
    create: { tag, data },
    update: { data },
    where: { tag }
  });

  return {
    id: '',
    tag,
    data,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

function getLastUpdate(dat: Analytic) {
  if (dat.updatedAt) return dat.updatedAt;
  return dat.createdAt;
}

function getElapsedHours(date: Date) {
  return Math.floor(date.getTime() / 3600000);
}

export default resolver.pipe(resolver.authorize(), async ({ where, withLeaderBoard }: FindUniqueAnalyticInput) => {
  let tmp = await db.analytic.findFirst({ where });

  if ((withLeaderBoard && !tmp) || getElapsedHours(getLastUpdate(tmp!)) < getElapsedHours(new Date()))
    tmp = await updateUserStats('leaderboard');

  return tmp;
});
