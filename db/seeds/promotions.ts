import db from "../index"

const promotions = async () => {
  for (let i = 2015; i < 2020; ++i) {
    await db.promotion.create({
      data: {
        year: i,
      },
    })
  }
}

export default promotions
