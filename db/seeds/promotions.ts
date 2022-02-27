const promotions = async (db) => {
  for (let i = 2015; i < 2020; ++i) {
    await db.promotion.create({
      data: {
        year: i
      }
    })
  }
}

export default promotions
