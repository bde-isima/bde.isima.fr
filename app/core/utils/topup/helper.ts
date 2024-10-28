import { BinaryLike, KeyObject, createHmac, randomBytes } from 'crypto';
import { stringify } from 'safe-stable-stringify';
import zod, { string } from 'zod';

export function makeMerchantReference(card: number, timestamp: number) {
  const card_prefix = card > 0 ? 'p' : 'm';

  return `r${card_prefix}${Math.abs(card)}t${Math.ceil(timestamp)}`;
}

export function makeShopOrderReference(card: number, amount: number) {
  const card_prefix = card > 0 ? 'p' : 'm';

  return `o${card_prefix}${Math.abs(card)}a${amount}`;
}

const AuthorizationObjectScheme = zod.object({
  nonce: zod.string(),
  timestamp: zod.number().int().positive(),
  id: string().uuid(),
  hash: string()
});

export function makeJson(from): string {
  return stringify(from)!;
}

function makeNonce() {
  return randomBytes(3).toString('hex');
}

function makeHmac(
  secret: BinaryLike | KeyObject,
  payload: string,
  timestamp: number,
  path: string,
  nonce: string,
  method: string,
  algorithm: string
): string {
  const raw = [method, path, payload, nonce, timestamp].join('+');

  return createHmac(algorithm, secret).update(raw).digest('hex');
}

export function makeAuthorizationHeader(
  secret: BinaryLike | KeyObject,
  posId: string,
  payload: string,
  timestamp: number,
  path: string,
  nonce: string = makeNonce(),
  method: string = 'POST',
  algorithm: string = 'sha512'
): string {
  const hmac = makeHmac(secret, payload, timestamp, path, nonce, method, algorithm);

  return `MAC ${hmac}, nonce=${nonce}, timestamp=${timestamp}, id=${posId}, hash=${algorithm}`;
}

export function validateAuthorizationHeader(
  handledSecrets: Map<string, BinaryLike | KeyObject>,
  authorizationString: string,
  payload: string,
  path: string,
  method: string = 'POST'
): boolean {
  const [hmac, ...rawParameters] = authorizationString.split(',');
  const { nonce, timestamp, id, hash } = AuthorizationObjectScheme.parse(
    new Map(rawParameters.map((v) => v.split('=', 1) as [string, string]))
  );

  if (handledSecrets.has(id)) {
    const secret = handledSecrets[id];

    const refHmac = makeHmac(secret, payload, timestamp, path, nonce, method, hash);

    return hmac == `MAC ${refHmac}`;
  } else {
    return false;
  }
}

// export type TopUpInfo = {
//   userId: string;
//   card: number;
//   amount: number;
//   reference: string;
//   orderReference: string;
//   creationDate: number;
// };

// export function generateTopUpToken(info: TopUpInfo, secret: BinaryLike | KeyObject) {
//   let ret = Buffer.from(JSON.stringify(info)).toString('base64url');

//   return `${ret}.${createHmac('sha512', secret).update(ret).digest('hex')}`;
// }

// export function parseTopUpToken(token: string, secret: BinaryLike | KeyObject) {
//   let data = token.split('.');

//   if (data.length != 2) return null;

//   if (data[1] != createHmac('sha512', secret).update(data[0]).digest('hex')) return null;

//   try {
//     return JSON.parse(Buffer.from(data[0], 'base64url').toString('utf8'));
//   } catch {
//     return null;
//   }
// }
