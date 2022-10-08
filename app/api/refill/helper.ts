import { BinaryLike, createHmac, KeyObject } from 'crypto'
import base64url from 'base64url'

export function makeMerchantReference(card: number, timestamp: number): string {
  const card_prefix = card > 0 ? 'p' : 'm'

  return `r${card_prefix}${Math.abs(card)}t${Math.ceil(timestamp)}`
}

export function makeShopOrderReference(card: number, amount: number): string {
  const card_prefix = card > 0 ? 'p' : 'm'

  return `o${card_prefix}${Math.abs(card)}a${amount}`
}

export function makeHmac(elements: Array<any>, secret: BinaryLike | KeyObject): string {
  let encoded = ''

  elements.forEach((val, idx) => {
    if (idx == 0) {
      encoded += `${val}`
    } else {
      encoded += `*${val}`
    }
  })

  return createHmac('sha1', secret).update(encoded).digest('hex')
}

export type RefillInfo = {
  user_id: string
  card: number
  amount: number
  reference: string
  order_reference: string
  creation_date: number
  by_credit_card: boolean
}

export function generateRefillToken(info: RefillInfo, secret: BinaryLike | KeyObject): string {
  let ret = base64url.encode(JSON.stringify(info))

  return `${ret}.${createHmac('sha1', secret).update(ret).digest('hex')}`
}

export function parseRefillToken(token: string, secret: BinaryLike | KeyObject): RefillInfo | null {
  let data = token.split('.')

  if (data.length != 2) return null

  if (data[1] != createHmac('sha1', secret).update(data[0]).digest('hex')) return null

  try {
    return JSON.parse(base64url.decode(data[0]))
  } catch {
    return null
  }
}
