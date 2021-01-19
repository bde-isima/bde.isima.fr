import faker from "faker"

const partners = async (db) => {
  for (let i = 0; i < 7; ++i) {
    await db.partner.create({
      data: {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(250, 250, undefined, false, true),
      },
    })
  }
}

export default partners
