import md5 from "md5"
import nextConnect from "next-connect"
import { NextApiRequest, NextApiResponse } from "next"

import db from "db"
import middleware from "../middleware/middleware"

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, query } = req

  const {
    amount,
    currency,
    order_ref,
    request_id,
    signed,
    transaction_identifier,
    vendor_token,
    sig,
  } = body

  const signature = md5(
    `&amount=${amount}currency=${currency}&order_ref=${order_ref}&request_id=${request_id}&signed=${signed}&transaction_identifier${transaction_identifier}&vendor_token${vendor_token}&${process.env.LYDIA_API_VENDOR_ID}`
  )
  const id = query.userId as string
  const tAmount = parseFloat(amount)

  if (sig !== signature) {
    console.error(sig)
    console.error(signature)
    console.error(currency)
    console.error(request_id)
    console.error(signed)
    console.error(vendor_token)
    console.error(order_ref)
    console.error("Rechargement non autorisé")
    res.status(401).json({ name: "Rechargement non autorisé" })
  } else if (Number.isNaN(tAmount) || tAmount <= 0) {
    console.error("Montant incorrect")
    res.status(403).json({ name: "Montant incorrect" })
  } else {
    const user = await db.user.findUnique({ where: { id } })

    if (user) {
      await Promise.all([
        db.user.update({
          where: { id },
          data: { balance: { increment: tAmount } },
        }),
        db.transaction.create({
          data: {
            amount: tAmount,
            description: `Rechargement +${tAmount} €`,
            type: "CREDIT",
            user: { connect: { id } },
            prevBalance: user.balance,
          },
        }),
      ])

      console.log("Rechargement effectué")
      res.status(200).json({ name: "Rechargement effectué" })
    } else {
      console.error("Utilisateur introuvable")
      res.status(404).json({ name: "Utilisateur introuvable" })
    }
  }
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler
