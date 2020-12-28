import clubs from "./seeds/clubs"
import users from "./seeds/users"
import events from "./seeds/events"
import articles from "./seeds/articles"
import partners from "./seeds/partners"
import promotions from "./seeds/promotions"
import transactions from "./seeds/transactions"
import eventSubscriptions from "./seeds/eventSubscriptions"

const seed = async () => {
  await promotions()
  await clubs()
  await users()
  await events()
  await articles()
  await partners()
  await transactions()
  await eventSubscriptions()
}

export default seed
