import db from "../index"
import faker from "faker"

const transactions = async () => {
  let prevBalance = 0
  const article = await db.article.findFirst()
  const emitter = await db.user.findFirst()

  if (article) {
    // Article transaction
    for (let i = 0; i < 10; ++i) {
      const amount = parseFloat(faker.finance.amount())

      await db.transaction.create({
        data: {
          amount,
          description: faker.lorem.sentence(),
          type: "DEBIT",
          user: { connect: { id: "123456789" } },
          prevBalance,
          article: { connect: { id: article.id } },
        },
      })

      prevBalance = i % 2 === 0 ? prevBalance + amount : prevBalance - amount
    }
  } else {
    throw new Error("No article found")
  }

  if (emitter) {
    // Normal transaction DEBIT + CREDIT
    for (let i = 0; i < 50; ++i) {
      const amount = parseFloat(faker.finance.amount())

      await db.transaction.create({
        data: {
          amount,
          description: faker.lorem.sentence(),
          type: i % 2 === 0 ? "CREDIT" : "DEBIT",
          ...(i % 2 === 0 ? { emitter: { connect: { id: emitter.id } } } : {}),
          user: { connect: { id: "123456789" } },
          prevBalance,
        },
      })

      prevBalance = i % 2 === 0 ? prevBalance + amount : prevBalance - amount
    }
  } else {
    throw new Error("No emitter found")
  }
}

export default transactions
