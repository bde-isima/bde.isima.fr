import { BinaryLike, KeyObject, createHmac } from 'crypto'
import base64url from 'base64url'

export function makeMerchantReference(card: number, timestamp: number) {
  const card_prefix = card > 0 ? 'p' : 'm'

  return `r${card_prefix}${Math.abs(card)}t${Math.ceil(timestamp)}`
}

export function makeShopOrderReference(card: number, amount: number) {
  const card_prefix = card > 0 ? 'p' : 'm'

  return `o${card_prefix}${Math.abs(card)}a${amount}`
}

export function makeHmac(elements: any[], secret: BinaryLike | KeyObject) {
  return createHmac('sha1', secret).update(elements.join('*')).digest('hex')
}

export type TopUpInfo = {
  userId: string
  card: number
  amount: number
  reference: string
  orderReference: string
  creationDate: number
  byCreditCard: boolean
}

export function generateTopUpToken(info: TopUpInfo, secret: BinaryLike | KeyObject) {
  let ret = Buffer.from(JSON.stringify(info)).toString('base64url')

  return `${ret}.${createHmac('sha1', secret).update(ret).digest('hex')}`
}

export function parseTopUpToken(token: string, secret: BinaryLike | KeyObject) {
  let data = token.split('.')

  if (data.length != 2) return null

  if (data[1] != createHmac('sha1', secret).update(data[0]).digest('hex')) return null

  try {
    return JSON.parse(Buffer.from(data[0], 'base64url').toString('utf8'))
  } catch {
    return null
  }
}
