import db from "../index"
import articles from "./0.json"
import users from "./1.json"
import clubs from "./2.json"
import partners from "./3.json"
import promotions from "./4.json"
;(async () => {
  const seeds = [
    "session",
    "loginRequest",
    "userStats",
    "analytic",
    "eventSubscription",
    "transaction",
    "partner",
    "article",
    "event",
    "user",
    "club",
    "promotion",
  ]
  try {
    await db.$connect()

    for (const s of seeds) {
      await db[s].deleteMany()
    }
    console.log("Done resetting")

    const mapOldArtToNew = await Promise.all(
      articles.map((x) =>
        db.article
          .create({
            data: {
              name: x.name,
              price: x.price,
              member_price: x.member_price,
              is_enabled: x.is_enabled,
            },
          })
          .then((res) => ({
            oldId: x.id,
            newId: res.id,
          }))
      )
    )
    console.log("Done articles")

    await Promise.all(
      clubs.map((x) =>
        db.club.create({
          data: {
            name: x.name,
            email: x.email,
            description: x.description,
            facebookURL: x.facebookURL,
            twitterURL: x.twitterURL,
            instagramURL: x.instagramURL,
          },
        })
      )
    )
    console.log("Done clubs")

    await Promise.all(
      partners.map((x) =>
        db.partner.create({
          data: {
            name: x.name,
            description: x.description,
          },
        })
      )
    )
    console.log("Done partners")

    const mapOldPromToNew = await Promise.all(
      promotions.map((x) =>
        db.promotion
          .create({
            data: {
              year: x.year,
              fb_group_id: x.fb_group_id,
            },
          })
          .then((res) => ({
            oldId: x.id,
            newId: res.id,
            year: x.year,
          }))
      )
    )
    console.log("Done promotions")

    await Promise.all(
      users.map((x) => {
        const articlesStats = {}

        if (x.stats) {
          const stats = JSON.parse(x.stats)
          stats?.articles?.forEach((y) => {
            const res = mapOldArtToNew.find((x) => x.oldId === y.id)
            if (res?.newId) {
              Object.assign(articlesStats, {
                [res.newId]: y.units,
              })
            } else {
              console.error("Error")
            }
          })
        }

        const res = mapOldPromToNew.find((z) => z.oldId === x.promotion_id)

        return db.user.create({
          data: {
            lastname: x.lastname,
            firstname: x.firstname,
            nickname: x.nickname ? x.nickname.trim() : null,
            email: x.email,
            card: x.card,
            balance: x.balance,
            promotionId: res?.newId ? `${res.newId}` : undefined,
            userStats: {
              create: {
                articlesStats,
              },
            },
            roles: x.email === "adrien.lenoir42440@gmail.com" ? ["*"] : [],
            is_member: x.is_member,
            is_enabled: res?.year && res.year > 2019 ? true : false,
            createdAt: x.created_at,
          },
        })
      })
    )
    console.log("Done users")

    console.log("Done")
  } catch (err) {
    console.error(err)
  } finally {
    await db.$disconnect()
  }
})()
