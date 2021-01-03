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
  try {
    await db.$connect()
    await promotions(db)
    await clubs(db)
    await users(db)
    await events(db)
    await articles(db)
    await partners(db)
    await transactions(db)
    await eventSubscriptions(db)
  } catch (err) {
    console.error(err)
  } finally {
    await db.$disconnect()
  }
})()
