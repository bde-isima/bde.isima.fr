import * as z from "zod"
import { State, PaymentMethod } from "db"

export const LoginInput = z.object({
  identifier: z.string(),
})
export type LoginInputType = z.infer<typeof LoginInput>

export const TransferInput = z.object({
  amount: z.string().regex(/^-?\d+\.?\d*$/, { message: "Montant invalide" }),
  description: z.string().max(255).optional().nullable(),
  receiver: z
    .object({
      id: z.string(),
    })
    .nonstrict(),
})
export type TransferInputType = z.infer<typeof TransferInput>

export const AdminTransferInput = z.object({
  amount: z.string().regex(/^-?\d+\.?\d*$/, { message: "Montant invalide" }),
  description: z.string().max(255).optional().nullable(),
})
export type AdminTransferInputType = z.infer<typeof AdminTransferInput>

export const TopUpInput = z.object({
  amount: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Montant invalide" }),
  recipient: z
    .string()
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, { message: "Numéro invalide" }),
})
export type TopUpInputType = z.infer<typeof TopUpInput>

export const ContactInput = z.object({
  subject: z.string().max(255),
  email: z.string().max(255),
  message: z.string().min(200),
})
export type ContactInputType = z.infer<typeof ContactInput>

export const FeedbackInput = z.object({
  subject: z.string().max(255),
  message: z.string().min(100),
})
export type FeedbackInputType = z.infer<typeof FeedbackInput>

export const SettingsInput = z
  .object({
    nickname: z.string().max(255).optional().nullable(),
    email: z.string().email().max(255),
    image: z.string().optional().nullable(),
  })
  .nonstrict()
export type SettingsInputType = z.infer<typeof SettingsInput>

export const ClubInput = z
  .object({
    id: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    email: z.string().email().max(255).optional().nullable(),
    description: z.string().max(3000).optional().nullable(),
    facebookURL: z.string().url().optional().nullable(),
    twitterURL: z.string().url().optional().nullable(),
    instagramURL: z.string().url().optional().nullable(),
    customURL: z.string().url().optional().nullable(),
  })
  .nonstrict()
export type ClubInputType = z.infer<typeof ClubInput>

export const ArticleInput = z
  .object({
    id: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    name: z.string().max(255),
    price: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Prix invalide" }),
    member_price: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Prix invalide" }),
    is_enabled: z.boolean(),
  })
  .nonstrict()
export type ArticleInputType = z.infer<typeof ArticleInput>

export const PartnerInput = z
  .object({
    id: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    name: z.string().max(255),
    description: z.string().max(3000).optional().nullable(),
  })
  .nonstrict()
export type PartnerInputType = z.infer<typeof PartnerInput>

export const PromotionInput = z
  .object({
    id: z.string().optional().nullable(),
    year: z.string(),
    fb_group_id: z.string().max(255).optional().nullable(),
    list_email: z.string().max(255).optional().nullable(),
  })
  .nonstrict()
export type PromotionInputType = z.infer<typeof PromotionInput>

export const UserInput = z
  .object({
    id: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    lastname: z.string().max(255),
    firstname: z.string().max(255),
    nickname: z.string().max(255).optional().nullable(),
    email: z.string().email().max(255),
    card: z.string(),
    balance: z.string(),
    roles: z.array(z.string()),
    promotionId: z.string().optional(),
    is_member: z.boolean(),
    is_enabled: z.boolean(),
  })
  .nonstrict()
export type UserInputType = z.infer<typeof UserInput>

export const EventInput = z
  .object({
    id: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
    name: z.string().max(255),
    description: z.string().max(3000).optional().nullable(),
    takes_place_at: z.date(),
    subscriptions_end_at: z.date(),
    status: z.nativeEnum(State),
    club: z.object({
      connect: z.object({
        name: z.string(),
      }),
    }),
    max_subscribers: z.number().min(0).optional().nullable(),
    products: z.array(
      z.object({
        name: z.string().max(255),
        price: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Prix invalide" }),
        description: z.string().max(3000).optional().nullable(),
        groupOptions: z.array(
          z.object({
            name: z.string().max(255),
            type: z.enum(["exclusive", "combinable"]),
            options: z.array(
              z.object({
                name: z.string().max(255),
                price: z
                  .string()
                  .regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Prix invalide" }),
                description: z.string().max(3000).optional().nullable(),
              })
            ),
          })
        ),
      })
    ),
  })
  .nonstrict()
export type EventInputType = z.infer<typeof EventInput>

export const EventSubscriptionInput = z
  .object({
    payment_method: z.nativeEnum(PaymentMethod),
    cart: z.array(
      z.object({
        name: z.string().max(255),
        description: z.string().max(500).optional().nullable(),
        price: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Prix invalide" }),
        quantity: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Quantité invalide" }),
        comment: z.string().nullable(),
        options: z.array(
          z.object({
            name: z.string().max(255),
            description: z.string().max(500).optional().nullable(),
            price: z.string().regex(/^[+]?([.]\d+|\d+([.]\d+)?)$/, { message: "Prix invalide" }),
          })
        ),
      })
    ),
  })
  .nonstrict()
export type EventSubscriptionInputType = z.infer<typeof EventSubscriptionInput>

export const AddSubscriptionInput = z.object({
  subscriber: z
    .object({
      id: z.string(),
    })
    .nonstrict(),
})
export type AddSubscriptionInputType = z.infer<typeof AddSubscriptionInput>
