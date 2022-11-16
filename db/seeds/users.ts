import { faker } from '@faker-js/faker';

const users = async (db) => {
  const promotion = await db.promotion.findFirst();

  //User to log in with
  await db.user.create({
    data: {
      id: '123456789',
      lastname: 'Lenoir',
      firstname: 'Adrien',
      nickname: faker.name.fullName({ sex: 'male' }),
      image: faker.image.imageUrl(100, 100, undefined, true),
      email: 'adrien.lenoir42440@gmail.com',
      card: 941,
      balance: 0,
      roles: '*',
      promotionId: promotion.id,
      address: {
        name: faker.address.streetAddress(),
        city: faker.address.cityName(),
        zipcode: faker.address.zipCodeByState('FR')
      }
    }
  });

  await db.user.create({
    data: {
      id: '9887654321',
      lastname: 'Duet',
      firstname: 'Venceslas',
      nickname: 'venny',
      image: 'https://i.imgur.com/VbdBkxz.png',
      email: 'duet.venceslas@orange.fr',
      card: 1463,
      balance: 0,
      roles: '*',
      promotionId: promotion.id,
      address: {
        name: faker.address.streetAddress(),
        city: faker.address.cityName(),
        zipcode: faker.address.zipCodeByState('FR')
      }
    }
  });

  await db.user.create({
    data: {
      id: '666',
      lastname: 'Nguyen',
      firstname: 'Damien',
      nickname: 'vietdamien',
      image: 'https://i.imgur.com/8Zz9s7l.jpeg',
      email: 'damsng63@gmail.com',
      card: 666,
      balance: 1000,
      roles: '*',
      promotionId: promotion.id,
      address: {
        name: faker.address.streetAddress(),
        city: faker.address.cityName(),
        zipcode: faker.address.zipCodeByState('FR')
      }
    }
  });

  for (let i = 0; i < 4; ++i) {
    await db.user.create({
      data: {
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        nickname: faker.name.fullName(),
        image: faker.image.imageUrl(100, 100, undefined, true),
        email: faker.internet.email(),
        card: faker.datatype.number(),
        balance: parseFloat(faker.finance.amount()),
        promotionId: promotion.id,
        address: {
          name: faker.address.streetAddress(),
          city: faker.address.cityName(),
          zipcode: faker.address.zipCodeByState('FR')
        }
      }
    });
  }
};

export default users;
