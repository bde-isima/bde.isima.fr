import faker from "faker"

const clubs = async (db) => {
  for (let i = 0; i < 5; ++i) {
    await db.club.create({
      data: {
        name: faker.lorem.word(),
        email: faker.internet.email(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),
      },
    })
  }
}

export default clubs
