import db from "../index"
import faker from "faker"

const partners = async () => {
  for (let i = 0; i < 5; ++i) {
    await db.partner.create({
      data: {
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        image: faker.image.imageUrl(),
      },
    })
  }
}

export default partners
