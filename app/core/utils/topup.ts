import { BinaryLike, KeyObject, createHmac, createSecretKey, randomBytes } from 'crypto';

export function makeMerchantReference(card: number, timestamp: number) {
  const card_prefix = card > 0 ? 'p' : 'm';

  return `r${card_prefix}${Math.abs(card)}t${Math.ceil(timestamp)}`;
}

export function makeShopOrderReference(card: number, amount: number) {
  const card_prefix = card > 0 ? 'p' : 'm';

  return `o${card_prefix}${Math.abs(card)}a${amount}`;
}

export function generateCertificationSeal(
  secret: BinaryLike | KeyObject,
  method: 'POST',
  callPath: string,
  payload?: string,
  timestamp?: number,
  nonce?: string,
  hashAlgorithm: 'sha512' = 'sha512'
) {
  if (nonce === undefined) nonce = makeNonce();
  if (timestamp === undefined) timestamp = Math.floor(+new Date() / 1000);
  if (payload && payload.trim() === '') payload = undefined;

  const seal = [method, callPath, payload, nonce, timestamp].filter((v) => v !== undefined).join('+');

  console.debug(seal);

  const hmac = createHmac(hashAlgorithm, secret).update(seal).digest('hex');

  return {
    hmac: hmac,
    nonce: nonce,
    timestamp: timestamp
  };
}

export function makeHmac(elements: any[], secret: BinaryLike | KeyObject, sep: string, hashAlgorithm: string) {
  return createHmac(hashAlgorithm, secret).update(elements.join(sep)).digest('hex');
}

export function makeNonce() {
  return randomBytes(16).toString('hex');
}

export type TopUpInfo = {
  userId: string;
  card: number;
  amount: number;
  reference: string;
  orderReference: string;
  creationDate: number;
};

export function generateTopUpToken(info: TopUpInfo, secret: BinaryLike | KeyObject) {
  let ret = Buffer.from(JSON.stringify(info)).toString('base64url');

  return `${ret}.${createHmac('sha512', secret).update(ret).digest('hex')}`;
}

export function parseTopUpToken(token: string, secret: BinaryLike | KeyObject) {
  let data = token.split('.');

  if (data.length != 2) return null;

  if (data[1] != createHmac('sha512', secret).update(data[0]).digest('hex')) return null;

  try {
    return JSON.parse(Buffer.from(data[0], 'base64url').toString('utf8'));
  } catch {
    return null;
  }
}
