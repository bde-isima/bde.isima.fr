import faker from "faker"

const users = async (db) => {
  const promotion = await db.promotion.findFirst()

  //User to log in with
  await db.user.create({
    data: {
      id: "123456789",
      lastname: "Lenoir",
      firstname: "Adrien",
      nickname: faker.name.findName(),
      image: faker.image.imageUrl(100, 100, undefined, false, true),
      email: "adrien.lenoir42440@gmail.com",
      card: 941,
      balance: 0,
      roles: "*",
      promotionId: promotion.id,
    },
  })

  await db.user.create({
    data: {
      lastname: "VÉROT",
      firstname: "Corentin",
      nickname: "Corentin",
      image: faker.image.imageUrl(100, 100, undefined, false, true),
      email: "corentin.verot@outlook.com",
      card: 1511,
      balance: 1000,
      roles: "*",
      promotionId: promotion.id,
    },
  })

  for (let i = 0; i < 4; ++i) {
    await db.user.create({
      data: {
        lastname: faker.name.lastName(),
        firstname: faker.name.firstName(),
        nickname: faker.name.findName(),
        image: faker.image.imageUrl(100, 100, undefined, false, true),
        email: faker.internet.email(),
        card: faker.random.number(),
        balance: parseFloat(faker.finance.amount()),
        promotionId: promotion.id,
      },
    })
  }
}

export default users
