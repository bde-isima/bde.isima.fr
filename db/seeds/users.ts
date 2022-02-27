import faker from '@faker-js/faker'

const users = async (db) => {
  const promotion = await db.promotion.findFirst()

  //User to log in with
  await db.user.create({
    data: {
      id: '123456789',
      lastname: 'Lenoir',
      firstname: 'Adrien',
      nickname: faker.name.findName(),
      image: faker.image.imageUrl(100, 100, undefined, false, true),
      email: 'adrien.lenoir42440@gmail.com',
      card: 941,
      balance: 0,
      roles: '*',
      promotionId: promotion.id
    }
  })

  for (let i = 0; i < 4; ++i) {
    await db.user.create({
      data: {
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        nickname: faker.name.findName(),
        image: faker.image.imageUrl(100, 100, undefined, false, true),
        email: faker.internet.email(),
        card: faker.datatype.number(),
        balance: parseFloat(faker.finance.amount()),
        promotionId: promotion.id
      }
    })
  }
}

export default users
