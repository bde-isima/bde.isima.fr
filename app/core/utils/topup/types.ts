// Automatically generated from a conversion from the inferred JSON
// schema file from the Swagger-schema file provided by the documentation
// by the tool available at https://transform.tuyen.blog/json-schema-to-zod
import * as z from 'zod';

// Payment context information:
// - `PayAtTable`: Use for pay at table context.
// - `FaceToFace`: Use for payment in presence of the client (e.g. the merchant present a
// dedicated QR Code containing the PaymentIntent URL).
// - `ScanAndGo`: Use for Scan and Go context

export const PaymentContextEnumSchema = z.enum(['FaceToFace', 'PayAtTable', 'ScanAndGo']);
export type PaymentContextEnum = z.infer<typeof PaymentContextEnumSchema>;

export const VersionEnumSchema = z.enum(['v4.0']);
export type VersionEnum = z.infer<typeof VersionEnumSchema>;

export const NextStepTypeEnumSchema = z.enum([
  'applePay',
  'hostedFields',
  'lyfPay',
  'moneticoPaymentPage',
  'uri',
  'uriOnRequest'
]);
export type NextStepTypeEnum = z.infer<typeof NextStepTypeEnumSchema>;

// Strategy for handling end-user interaction. This is separate from the PaymentIntent
// status.

export const PaymentIntentStrategyEnumSchema = z.enum([
  'cancelled',
  'error',
  'expired',
  'paymentMeans',
  'paymentMeansPostLunchCard',
  'polling',
  'success'
]);
export type PaymentIntentStrategyEnum = z.infer<typeof PaymentIntentStrategyEnumSchema>;

// Strategy to recover the money.

export const FundingOptionStrategyEnumSchema = z.enum([
  'IMMEDIATE_FUNDING',
  'POSTPONED_BY_WALLET_FUNDING',
  'POSTPONED_FUNDING'
]);
export type FundingOptionStrategyEnum = z.infer<typeof FundingOptionStrategyEnumSchema>;

// Type of the funding.

export const FundingTypeEnumSchema = z.enum(['CREDIT_CARD', 'ELECTRONIC_MONEY', 'EXTERNAL_WALLET', 'LUNCH_CARD']);
export type FundingTypeEnum = z.infer<typeof FundingTypeEnumSchema>;

export const OfferTypeEnumSchema = z.enum(['DISCOUNT', 'GIFT']);
export type OfferTypeEnum = z.infer<typeof OfferTypeEnumSchema>;

// Type of the movement.

export const BillOperationEnumSchema = z.enum(['CREDIT', 'DEBIT']);
export type BillOperationEnum = z.infer<typeof BillOperationEnumSchema>;

// Indicates the status of the transaction recovery.

export const RecoveryStatusEnumSchema = z.enum(['AWAITING', 'DONE', 'PROCESSING']);
export type RecoveryStatusEnum = z.infer<typeof RecoveryStatusEnumSchema>;

// Refund reason of the transaction.

export const RefundReasonEnumSchema = z.enum([
  'CANCELED_ORDER',
  'GOODWILL_GESTURE',
  'OTHER',
  'REGULARIZATION',
  'RETURNED_ORDER',
  'UNWANTED_TRANSACTION'
]);
export type RefundReasonEnum = z.infer<typeof RefundReasonEnumSchema>;

// Refusal reason of the transaction.

export const RefusalReasonEnumSchema = z.enum([
  'CREDIT_REFUSED_BY_PSP',
  'CREDITOR_CANCELLATION',
  'DEBTOR_CANCELLATION',
  'OPTION_AMOUNT_LIMIT_FAILED',
  'REGULARIZATION',
  'UNCERTIFIED_SHOP_OVERALL_PAYMENT_CEIL_REACHED',
  'WALLET_REFUSED'
]);
export type RefusalReasonEnum = z.infer<typeof RefusalReasonEnumSchema>;

// Final status of the transaction.

export const StatusEnumSchema = z.enum(['REFUSED', 'VALIDATED']);
export type StatusEnum = z.infer<typeof StatusEnumSchema>;

export const TypeEnumSchema = z.enum(['CASH_IN', 'CASH_OUT', 'PAYMENT', 'REFUND']);
export type TypeEnum = z.infer<typeof TypeEnumSchema>;

export const HttpErrorResourceSchema = z.object({
  errorCode: z.string().optional(),
  httpStatus: z.number().optional(),
  message: z.string().optional()
});
export type HttpErrorResource = z.infer<typeof HttpErrorResourceSchema>;

export const BusinessContextResourceSchema = z.object({
  employeeId: z.string().optional(),
  meetingId: z.string().optional(),
  saleContextId: z.string().optional(),
  sellerId: z.string().optional()
});
export type BusinessContextResource = z.infer<typeof BusinessContextResourceSchema>;

export const ClientInfoResourceSchema = z.object({
  email: z.string().optional(),
  phoneNumber: z.string().optional()
});
export type ClientInfoResource = z.infer<typeof ClientInfoResourceSchema>;

export const DistributionRequestResourceSchema = z.object({
  amount: z.number(),
  shopUuid: z.string()
});
export type DistributionRequestResource = z.infer<typeof DistributionRequestResourceSchema>;

export const PaymentIntentAddressSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z.string().optional()
});
export type PaymentIntentAddress = z.infer<typeof PaymentIntentAddressSchema>;

export const PaymentMeanResourceSchema = z.object({
  identifier: z.string().optional(),
  isLunchCard: z.boolean().optional(),
  logoFile: z.string().optional(),
  name: z.string().optional(),
  nextStepType: NextStepTypeEnumSchema.optional(),
  uri: z.string().optional()
});
export type PaymentMeanResource = z.infer<typeof PaymentMeanResourceSchema>;

export const ShopResourceSchema = z.object({
  name: z.string().optional(),
  shopLogoUri: z.string().optional()
});
export type ShopResource = z.infer<typeof ShopResourceSchema>;

export const CreditorSchema = z.object({
  city: z.string().optional(),
  name: z.string().optional(),
  readableId: z.string().optional(),
  uuid: z.string().optional()
});
export type Creditor = z.infer<typeof CreditorSchema>;

export const DebtorSchema = z.object({
  city: z.string().optional(),
  name: z.string().optional(),
  origin: z.string().optional(),
  readableId: z.string().optional(),
  uuid: z.string().optional()
});
export type Debtor = z.infer<typeof DebtorSchema>;

export const FundingOptionSchema = z.object({
  strategy: FundingOptionStrategyEnumSchema.optional()
});
export type FundingOption = z.infer<typeof FundingOptionSchema>;

export const FundingOverviewSchema = z.object({
  amount: z.number().optional(),
  technicalData: z.any().optional(),
  type: FundingTypeEnumSchema.optional()
});
export type FundingOverview = z.infer<typeof FundingOverviewSchema>;

export const OfferSchema = z.object({
  amount: z.number().optional(),
  name: z.string().optional(),
  type: OfferTypeEnumSchema.optional(),
  value: z.number().optional()
});
export type Offer = z.infer<typeof OfferSchema>;

export const PointOfSaleSchema = z.object({
  readableId: z.string().optional(),
  uuid: z.string().optional()
});
export type PointOfSale = z.infer<typeof PointOfSaleSchema>;

export const RecoverySchema = z.object({
  additionalData: z.any().optional(),
  amount: z.number().optional(),
  date: z.coerce.date().optional(),
  uuid: z.string().optional()
});
export type Recovery = z.infer<typeof RecoverySchema>;

export const CreditCardSchema = z.object({
  walletId: z.string().optional()
});
export type CreditCard = z.infer<typeof CreditCardSchema>;

export const OrderSchema = z.object({
  tipAmount: z.number().optional()
});
export type Order = z.infer<typeof OrderSchema>;

export const SalesContextSchema = z.object({
  creationDate: z.coerce.date().optional(),
  modificationDate: z.coerce.date().optional(),
  posId: z.string().optional(),
  text: z.string().optional(),
  uuid: z.string().optional()
});
export type SalesContext = z.infer<typeof SalesContextSchema>;

export const PaymentIntentRequestSchema = z.object({
  additionalData: z.record(z.string(), z.any()).optional(),
  address: z.string().optional(),
  amount: z.number(),
  businessContext: BusinessContextResourceSchema.optional(),
  callbackEmail: z.string().optional(),
  callbackRequired: z.boolean().optional(),
  callbackUrl: z.string().optional(),
  city: z.string().optional(),
  clientInfo: ClientInfoResourceSchema.optional(),
  country: z.string().optional(),
  currency: z.string(),
  distributions: z.array(DistributionRequestResourceSchema).optional(),
  eligibleLunchCardsAmount: z.number().optional(),
  externalOrderReference: z.string().optional(),
  externalReference: z.string(),
  onCancel: z.string().optional(),
  onError: z.string().optional(),
  onSuccess: z.string().optional(),
  paymentContext: PaymentContextEnumSchema.optional(),
  tipAmount: z.number().optional(),
  version: VersionEnumSchema,
  zipCode: z.string().optional()
});
export type PaymentIntentRequest = z.infer<typeof PaymentIntentRequestSchema>;

export const PaymentIntentResponseSchema = z.object({
  address: PaymentIntentAddressSchema.optional(),
  amount: z.number(),
  currency: z.string(),
  eligibleLunchCardsAmount: z.number(),
  externalOrderReference: z.string().optional(),
  externalReference: z.string(),
  id: z.string(),
  onCancel: z.string().optional(),
  paymentContext: PaymentContextEnumSchema.optional(),
  paymentMeans: z.array(PaymentMeanResourceSchema).optional(),
  phoneNumber: z.string().optional(),
  posId: z.string(),
  redirectUri: z.string().optional(),
  remainingBalance: z.number(),
  shop: ShopResourceSchema,
  strategy: PaymentIntentStrategyEnumSchema,
  tipAmount: z.number(),
  totalAmount: z.number()
});
export type PaymentIntentResponse = z.infer<typeof PaymentIntentResponseSchema>;

export const HostedFieldsResponseSchema = z.object({
  creditCard: CreditCardSchema.optional()
});
export type HostedFieldsResponse = z.infer<typeof HostedFieldsResponseSchema>;

export const HostedFieldsSchema = z.object({
  response: HostedFieldsResponseSchema.optional()
});
export type HostedFields = z.infer<typeof HostedFieldsSchema>;

export const TechnicalDataSchema = z.object({
  hostedFields: HostedFieldsSchema.optional(),
  order: OrderSchema.optional()
});
export type TechnicalData = z.infer<typeof TechnicalDataSchema>;

export const BillSchema = z.object({
  additionalData: z.record(z.string(), z.any()).optional(),
  amount: z.number().optional(),
  creationDate: z.coerce.date().optional(),
  creditor: CreditorSchema.optional(),
  currency: z.string().optional(),
  debtor: DebtorSchema.optional(),
  discountAmount: z.number().optional(),
  externalOrderReference: z.string().optional(),
  externalReference: z.string().optional(),
  fundingOption: FundingOptionSchema.optional(),
  fundingOverview: z.array(FundingOverviewSchema).optional(),
  initialAmount: z.number().optional(),
  linkedTransactionUuid: z.string().optional(),
  offers: z.array(OfferSchema).optional(),
  operation: BillOperationEnumSchema.optional(),
  pos: PointOfSaleSchema.optional(),
  readableId: z.string().optional(),
  recoveredAmount: z.number().optional(),
  recoveries: z.array(RecoverySchema).optional(),
  recoveryStatus: RecoveryStatusEnumSchema.optional(),
  refundReason: RefundReasonEnumSchema.optional(),
  refusalReason: RefusalReasonEnumSchema.optional(),
  status: StatusEnumSchema.optional(),
  technicalData: TechnicalDataSchema.optional(),
  type: TypeEnumSchema.optional(),
  uuid: z.string().optional()
});
export type Bill = z.infer<typeof BillSchema>;

export const WebhookResourceSchema = z.object({
  bill: BillSchema.optional(),
  salesContext: SalesContextSchema.optional()
});
export type WebhookResource = z.infer<typeof WebhookResourceSchema>;

// export const MyTypeSchema = z.object({
//     'error': HttpErrorResourceSchema.optional(),
//     'request': PaymentIntentRequestSchema.optional(),
//     'response': PaymentIntentResponseSchema.optional(),
//     'webhook': WebhookResourceSchema.optional(),
// });
// export type MyType = z.infer<typeof MyTypeSchema>;
