const analytics = async (db) => {
  for (let i = 0; i < 25; ++i) {
    await db.analytic.create({
      data: {
        tag: `String${i + 1}`,
        data: {}
      }
    });
  }
};

export default analytics;
