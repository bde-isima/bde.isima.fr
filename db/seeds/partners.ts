import { faker } from '@faker-js/faker'

const partners = async (db) => {
  for (let i = 0; i < 7; ++i) {
    await db.partner.create({
      data: {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(250, 250, undefined)
      }
    })
  }
}

export default partners
