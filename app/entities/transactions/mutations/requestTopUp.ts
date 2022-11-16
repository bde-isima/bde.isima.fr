import { Ctx } from 'blitz';
import { Address } from 'global';

import { resolver } from '@blitzjs/rpc';

import { generateTopUpToken, makeHmac, makeMerchantReference, makeShopOrderReference } from 'app/core/utils/topup';

type RequestTopUpInput = {
  amount: number;
  method: PaymentMethod;
};

export type PaymentMethod = 'credit' | 'lyf';

function generateHmac(data: URLSearchParams, additionalData: string, byCreditCard: boolean): string {
  let list = [data.get('lang')];

  let common = [
    data.get('posUuid'),
    data.get('shopReference'),
    data.get('shopOrderReference'),
    data.get('deliveryFeesAmount'),
    data.get('amount'),
    data.get('currency')
  ];

  if (byCreditCard) {
    list = list.concat(common);
    list = list.concat([
      data.get('onSuccess'),
      data.get('onError'),
      additionalData,
      data.get('callBackRequired'),
      data.get('mode'),
      data.get('address'),
      data.get('city'),
      data.get('country'),
      data.get('zipCode')
    ]);
  } else {
    list = list.concat([data.get('version'), data.get('timestamp')]);
    list = list.concat(common);
    list = list.concat([
      data.get('mode'),
      data.get('onSuccess'),
      data.get('onCancel'),
      data.get('onError'),
      additionalData,
      data.get('enforcedIdentification')
    ]);
  }

  return makeHmac(list, `${process.env.LYF_API_SECRET_KEY}`);
}

function prepareRequest(
  id: string,
  card: number,
  amount: number,
  byCreditCard: boolean,
  mail_address?: Address
): URLSearchParams {
  const body = new URLSearchParams();

  const timestamp = Math.floor(+new Date() / 1000);
  const tAmount = Math.round(amount * 100);

  const shopReference = makeMerchantReference(card, timestamp);
  const shopOrderReference = makeShopOrderReference(card, tAmount);

  const token = generateTopUpToken(
    {
      userId: id,
      card,
      amount: tAmount,
      reference: shopReference,
      orderReference: shopOrderReference,
      creationDate: timestamp,
      byCreditCard
    },
    `${process.env.SESSION_SECRET_KEY}`
  );

  const userCallbackUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/hub`;
  const additionalData = `{"callbackUrl":"${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/topup/${token}"}`;

  // Common request fields
  body.append('lang', 'fr');
  body.append('version', 'v2.0');
  body.append('posUuid', `${process.env.LYF_API_VENDOR_ID}`);
  body.append('shopReference', shopReference);
  body.append('shopOrderReference', shopOrderReference);
  body.append('mode', 'IMMEDIATE');
  body.append('amount', `${tAmount}`);
  body.append('deliveryFeesAmount', '0');
  body.append('currency', 'EUR');
  body.append('onSuccess', userCallbackUrl);
  body.append('onError', userCallbackUrl);
  body.append('additionalDataEncoded', Buffer.from(additionalData).toString('base64'));

  // Method-specific fields
  if (byCreditCard) {
    body.append('caseNumber', '01234');
    body.append('callBackRequired', 'true');
    body.append('country', 'FR');

    if (mail_address) {
      body.append('address', `${mail_address.name}`);
      body.append('city', `${mail_address.city}`);
      body.append('zipCode', `${mail_address.zipCode}`);
    } else {
      body.append('address', '');
      body.append('city', '');
      body.append('zipCode', '');
    }
  } else {
    body.append('onCancel', userCallbackUrl);
    body.append('timestamp', `${timestamp}`);
    body.append('enforcedIdentification', 'false');
  }

  body.append('mac', generateHmac(body, additionalData, byCreditCard));

  return body;
}

export default resolver.pipe(resolver.authorize(), async (input: RequestTopUpInput, ctx: Ctx) => {
  if (Number.isNaN(input.amount) || input.amount <= 0 || input.amount >= 1000) {
    throw new Error('Valeur invalide');
  }

  const byCreditCard = input.method == 'credit';
  const req = prepareRequest(
    ctx.session.userId as string,
    ctx.session.card as number,
    input.amount,
    byCreditCard,
    ctx.session.address
  );

  return `${
    byCreditCard ? process.env.LYF_CREDIT_CARD_API_URL : process.env.LYF_FROM_APPLICATION_API_URL
  }?${req.toString()}`;
});
