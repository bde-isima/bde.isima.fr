import { faker } from '@faker-js/faker';

const clubs = async (db) => {

  await db.club.create({
    data: {
      name: 'listeux',
      email: faker.internet.email(),
      description: 'Rôle pour les listeux',
      image: faker.image.imageUrl(250, 250, undefined, true)
    }
  });

  await db.club.create({
    data: {
      name: 'bde',
      email: faker.internet.email(),
      description: 'Rôle pour les bde',
      image: faker.image.imageUrl(250, 250, undefined, true)
    }
  });


  for (let i = 0; i < 7; ++i) {
    await db.club.create({
      data: {
        name: faker.helpers.unique(faker.lorem.word),
        email: faker.internet.email(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(250, 250, undefined, true)
      }
    });
  }
};

export default clubs;
