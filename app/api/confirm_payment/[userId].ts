import nextConnect from 'next-connect'
import { NextApiRequest, NextApiResponse } from 'next'

import db from 'db'
import middleware from '../middleware/middleware'

const handler = nextConnect()

handler.use(middleware)

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { body, query } = req

    const {
        sig,
        amount,
        //currency,
        //request_id,
        //signed,
        //transaction_identifier,
        //vendor_token,
        //order_ref,
    } = body

    const sigArray = sig.split('&')         //@see https://homologation.lydia-app.com/doc/api/#signature
    const id = query.userId as string
    const tAmount = parseFloat(amount)

    if (sigArray[sigArray.length - 1] !== process.env.LYDIA_API_VENDOR_ID) {
        res.status(401).json({ name: "Rechargement non autorisé" })
    }
    else if (Number.isNaN(tAmount) || tAmount <= 0) {
        res.status(403).json({ name: "Montant incorrect" })
    }
    else {
        const user = await db.user.findUnique({ where: { id } })

        if (user) {
            await Promise.all([
                db.user.update({
                    where: { id },
                    data: { balance: { increment: tAmount } }
                }),
                db.transaction.create({
                    data: {
                        amount: tAmount,
                        description: `Rechargement +${tAmount} €`,
                        type: "CREDIT",
                        user: { connect: { id } },
                        prevBalance: user.balance,
                    }
                })
            ])

            res.status(200).json({ name: "Rechargement effectué" })
        }
        else {
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