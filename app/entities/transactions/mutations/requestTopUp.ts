import { Ctx } from 'blitz';
import { createSecretKey } from 'crypto';
import { stringify } from 'safe-stable-stringify';
import zod from 'zod';

import { resolver } from '@blitzjs/rpc';

import {
  makeAuthorizationHeader,
  makeJson,
  makeMerchantReference,
  makeShopOrderReference
} from 'app/core/utils/topup/helper';
import {
  HttpErrorResourceSchema,
  PaymentIntentRequest,
  PaymentIntentRequestSchema,
  PaymentIntentResponseSchema
} from 'app/core/utils/topup/types';

const INTENT_SUBPATH = '/acceptance/api/paymentIntents';
const INTENT_FULL_PATH = `${process.env.LYF_REQUEST_TOPUP_DOMAIN}${INTENT_SUBPATH}`;

const RequestTopUpInputSchema = zod.object({
  amount: zod
    .number()
    .min(5, { message: 'La quantité à recharger doit dépasser 5 euros.' })
    .max(1000, { message: 'La quantité à recharger ne peux pas exéder 1000 euros.' })
    .transform((v) => Math.floor(v * 100))
});
type RequestTopUpInput = zod.infer<typeof RequestTopUpInputSchema>;

export default resolver.pipe(resolver.authorize(), async (input: RequestTopUpInput, ctx: Ctx) => {
  const { amount } = RequestTopUpInputSchema.parse(input);
  const card = ctx.session.card!;
  const timestamp = Math.floor(new Date().getTime() / 1000);
  const secret = createSecretKey(process.env.LYF_API_SECRET_KEY!, 'hex');
  const posId = process.env.LYF_API_VENDOR_ID!;

  const intent: PaymentIntentRequest = {
    amount,
    currency: 'EUR',
    externalReference: makeMerchantReference(card, timestamp),
    externalOrderReference: makeShopOrderReference(card, amount),
    version: 'v4.0',
    callbackRequired: true,
    callbackEmail: 'contact@citorva.fr'
  };

  const payload = makeJson(intent);

  const authorization = makeAuthorizationHeader(secret, posId, payload, timestamp, INTENT_SUBPATH);

  const res = await fetch(INTENT_FULL_PATH, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.eu.lyf+json;version=5',
      Authorization: authorization
    },
    body: payload
  });

  const resObject = await res.json();

  if (res.ok) {
    const { id } = PaymentIntentResponseSchema.parse(resObject);

    const redirectUri = `${process.env.LYF_CHECKOUT_BASE_PATH!}/${id}`;

    return redirectUri;
  } else {
    const { httpStatus, errorCode, message } = HttpErrorResourceSchema.parse(resObject);

    console.error(`Lyf API Error ${errorCode} (HTTP Status ${httpStatus}): ${message}`);

    throw new Error('Une erreur interne est survenue');
  }
});
