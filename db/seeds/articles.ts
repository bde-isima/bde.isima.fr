import { faker } from '@faker-js/faker';

const articles = async (db) => {
  for (let i = 0; i < 25; ++i) {
    await db.article.create({
      data: {
        name: faker.lorem.word(),
        price: parseFloat(faker.finance.amount()),
        member_price: parseFloat(faker.finance.amount()),
        image: faker.image.imageUrl(250, 250, undefined, true),
        quantity: 100,
        min_quantity: 20
      }
    });
  }
};

export default articles;
