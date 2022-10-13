import db, { Article, User, UserStats } from '../../db';

type UserWithStats = User & { userStats: UserStats | null };

const tag = 'leaderboard';

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

await db.$disconnect();
