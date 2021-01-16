import fs from "fs"
import db from "../index"

function toJSON(array, idx) {
  fs.writeFile(`${idx}.json`, JSON.stringify(array), "utf8", function (err) {
    if (err) {
      console.log("An error occured while writing JSON Object to File.")
      return console.log(err)
    }

    console.log("JSON file has been saved.")
  })
}

;(async () => {
  try {
    await db.$connect()

    const res = await Promise.all([
      await db.article.findMany(),
      await db.user.findMany(),
      await db.club.findMany(),
      await db.partner.findMany(),
      await db.promotion.findMany(),
    ])

    res.forEach((result, idx) => {
      toJSON(result, idx)
    })

    console.log("Done")
  } catch (err) {
    console.error(err)
  } finally {
    await db.$disconnect()
  }
})()
