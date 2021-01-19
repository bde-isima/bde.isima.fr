import db from "../index"
;(async () => {
  const seeds = [
    "election",
    "candidate",
    "vote",
    "voteRequest",
    "loginRequest",
    "session",
    "userStats",
    "analytic",
    "eventSubscription",
    "transaction",
    "partner",
    "article",
    "event",
    "user",
    "club",
    "promotion",
  ]
  try {
    await db.$connect()

    for (const s of seeds) {
      await db[s].deleteMany()
    }

    console.log("Done resetting")
  } catch (err) {
    console.error(err)
  } finally {
    await db.$disconnect()
  }
})()
