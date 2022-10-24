import { Ctx } from 'blitz';

import { resolver } from '@blitzjs/rpc';

import { generateTopUpToken, makeHmac, makeMerchantReference, makeShopOrderReference } from 'app/core/utils/topup';

type RequestTopUpInput = {
  amount: number;
  method: PaymentMethod;
};

export type PaymentMethod = 'credit' | 'lyf';

function generate_hmac(data: URLSearchParams, additionalData: string, by_credit_card: boolean): string {
  let list = [data.get('lang')];

  let common = [
    data.get('posUuid'),
    data.get('shopReference'),
    data.get('shopOrderReference'),
    data.get('deliveryFeesAmount'),
    data.get('amount'),
    data.get('currency')
  ];

  if (by_credit_card) {
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

function prepare_request(id: string, card: number, amount: number, byCreditCard: boolean): URLSearchParams {
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

    if (process.env.NODE_ENV === 'development') {
      body.append('address', '7 Some Street');
      body.append('city', 'Bigcity');
      body.append('zipCode', '01234');
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

  body.append('mac', generate_hmac(body, additionalData, byCreditCard));

  return body;
}

export default resolver.pipe(
  resolver.authorize(),
  async (input: RequestTopUpInput, ctx: Ctx) => {
    if (Number.isNaN(input.amount) || input.amount <= 0 || input.amount >= 1000) {
      throw new Error('Valeur invalide');
    }

    let by_credit_card = input.method == 'credit';

    let req = prepare_request(ctx.session.userId as string, ctx.session.card as number, input.amount, by_credit_card);

    return `${
      by_credit_card ? process.env.LYF_CREDIT_CARD_API_URL : process.env.LYF_FROM_APPLICATION_API_URL
    }?${req.toString()}`;
  }
);
