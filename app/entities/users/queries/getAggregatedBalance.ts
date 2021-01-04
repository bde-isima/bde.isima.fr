import db from "db"

export default async function getAggregatedBalance() {
  //TODO ctx.session.authorize(["*", "bde"])

  const [negatives, positives] = await Promise.all([
    await db.user.count({
      where: { balance: { lt: 0 } },
    }),
    await db.user.count({
      where: { balance: { gt: 0 } },
    }),
  ])

  return {
    negatives,
    positives,
  }
}
