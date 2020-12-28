import db from "../index"
import faker from "faker"

const articles = async () => {
  for (let i = 0; i < 5; ++i) {
    await db.article.create({
      data: {
        name: faker.lorem.word(),
        price: parseFloat(faker.finance.amount()),
        member_price: parseFloat(faker.finance.amount()),
        image: faker.image.imageUrl(),
      },
    })
  }
}

export default articles
