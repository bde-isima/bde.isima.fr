import { Ctx } from 'blitz';

import { resolver } from '@blitzjs/rpc';

import {
  generateTopUpToken,
  makeHmac,
  makeMerchantReference,
  makeNonce,
  makeShopOrderReference
} from 'app/core/utils/topup';

const API_PATH = '/acceptance/api/paymentIntents';

type RequestTopUpInput = {
  amount: number;
};

type RequestTopUpOutput = { type: 'success'; url: string } | { type: 'error'; errorKind: 'internal' };

type DistributionInfo = {
  shopUuid: string;
  amount: number;
};

type PaymentMean = {
  name: string;
  identifier: string;
  nextStepType: 'applePay' | 'hostedFields' | 'uriOnRequest' | 'uri' | 'lyfPay' | 'moneticoPaymentPage';
  logoFile: string;
  isLunchCard: boolean;
  uri?: string;
};

type PaymentIntentPayload<Obj extends object> = {
  version: 'v4.0'; // Must be v4.0
  externalReference: string;
  externalOrderReference: string;
  currency: 'EUR'; // Must be EUR
  amount: number;
  tipAmount?: number;
  eligibleLunchCardsAmount?: number;
  onSuccess?: string;
  onCancel?: string;
  onError?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  callbackRequired?: boolean;
  callbackUrl?: string;
  callbackEmail?: string;
  distributions: DistributionInfo[];
  additionalData?: Obj;
  clientInfo?: {
    phoneNumber?: string;
    email?: string;
  };
  businessContext?:
    | { employeeId?: string }
    | { sellerId?: string }
    | { meetingId?: string }
    | { saleContextId?: string };
  paymentContext?: 'PayAtTable' | 'FaceToFace' | 'ScanAndGo';
};

type PaymentIntentError = {
  httpStatus: number;
  errorCode: '000000' | string;
  message: string;
};

type PaymentIntentResponse = {
  id: string;
  strategy: 'expired' | 'paymentMeans' | 'paymentMeansPostLunchCard' | 'polling' | 'success' | 'error' | 'cancelled';
  shop: {
    name: string;
    shopLogoUri: string;
  };
  posId: string;
  externalReference: string;
  externalOrderReference: string;
  currency: string;
  amount: number;
  tipAmount: number;
  totalAmount: number;
  eligibleLunchCardsAmount: number;
  remainingBalance: number;
  address: {
    address?: string;
    city?: string;
    zipcode?: string;
    country?: string;
  };
  paymentMeans: PaymentMean[];
  redirectUri?: string;
  onCancel: string;
  phoneNumber: string;
  paymentContext?: 'PayAtTable' | 'FaceToFace' | 'ScanAndGo';
};

function generateAuthorizationHeader(secret: string, pos_id: string, payload: string, timestamp: number) {
  const hash_algorithm = 'sha512';
  const nonce = makeNonce();

  const hmac = makeHmac(['POST', API_PATH, payload, nonce, timestamp], secret, '+', hash_algorithm);

  return `MAC ${hmac}, nonce=${nonce}, timestamp=${timestamp}, id=${pos_id}, hash=${hash_algorithm}`;
}

function prepareRequest(id: string, card: number, amount: number, byCreditCard: boolean): Request {
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

  // Common request fields
  const request: PaymentIntentPayload<object> = {
    version: 'v4.0',
    externalReference: shopReference,
    externalOrderReference: shopOrderReference,
    currency: 'EUR',
    amount: tAmount,
    distributions: [],
    onSuccess: userCallbackUrl,
    onCancel: userCallbackUrl,
    onError: userCallbackUrl,
    callbackRequired: true,
    callbackUrl: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/topup/${token}`
  };

  const payload = JSON.stringify(request);

  let headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/vnd.eu.lyf+json;version=5');
  headers.set(
    'Authorization',
    generateAuthorizationHeader(process.env.LYF_API_SECRET_KEY!, process.env.LYF_API_VENDOR_ID!, payload, timestamp)
  );

  return new Request(`${process.env.LYF_API_DOMAIN}${API_PATH}`, {
    method: 'POST',
    headers: headers,
    body: payload
  });
}

export default resolver.pipe(
  resolver.authorize(),
  async (input: RequestTopUpInput, ctx: Ctx): Promise<RequestTopUpOutput> => {
    if (Number.isNaN(input.amount) || input.amount <= 0 || input.amount >= 1000) {
      throw new Error('Valeur invalide');
    }

    const byCreditCard = input.method == 'credit';
    const req = prepareRequest(ctx.session.userId as string, ctx.session.card as number, input.amount, byCreditCard);

    const answer = await fetch(req);

    if (answer.ok) {
      const result: PaymentIntentResponse = await answer.json();

      if (result.redirectUri) {
        return {
          type: 'success',
          url: result.redirectUri
        };
      } else {
        console.error('Unhandled response received from the API call');
        console.info('Given authorization header: %s', req.headers.get('Authorization'));
        console.info('Given payload: \n%s', await req.json());
        console.info('Given response: \n%s', await answer.json());

        return {
          type: 'error',
          errorKind: 'internal'
        };
      }
    } else {
      const error_data: PaymentIntentError = await answer.json();

      console.error(
        'Lyf payment intent for status %d (lyf error %s): %s',
        error_data.httpStatus,
        error_data.errorCode,
        error_data.message
      );

      console.info('Given authorization header: %s', req.headers.get('Authorization'));
      console.info('Given payload: \n%s', await req.json());

      return {
        type: 'error',
        errorKind: 'internal'
      };
    }
  }
);
