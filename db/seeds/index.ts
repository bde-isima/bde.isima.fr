import db from "../index"
import clubs from "./clubs"
import users from "./users"
import events from "./events"
import articles from "./articles"
import partners from "./partners"
import promotions from "./promotions"
import transactions from "./transactions"
import eventSubscriptions from "./eventSubscriptions"
;(async () => {
  const seeds = [
    "vote",
    "voteRequest",
    "loginRequest",
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

    await promotions(db)
    await clubs(db)
    await users(db)
    await events(db)
    await articles(db)
    await partners(db)
    await transactions(db)
    await eventSubscriptions(db)

    console.log("Done seeding")
  } catch (err) {
    console.error(err)
  } finally {
    await db.$disconnect()
  }
})()
