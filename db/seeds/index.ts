import db from '../index';
import analytics from './analytics';
import articles from './articles';
import clubs from './clubs';
import eventSubscriptions from './eventSubscriptions';
import events from './events';
import partners from './partners';
import promotions from './promotions';
import services from './services';
import transactions from './transactions';
import users from './users';

async function main() {
  await analytics(db);
  await promotions(db);
  await clubs(db);
  await services(db);
  await users(db);
  await events(db);
  await articles(db);
  await partners(db);
  await transactions(db);
  await eventSubscriptions(db);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
