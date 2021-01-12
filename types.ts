import { DefaultCtx, SessionContext, DefaultPublicData } from "blitz"

import { User, Event, EventSubscription } from "db"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface PublicData extends DefaultPublicData {
    userId: User["id"]
    firstname: string
    lastname: string
    nickname: string | null
    image: string | null
    email: string
    card: number
  }
}

export interface Item {
  name: string
  description: string | null
  price: number
}

export type Option = Item

export interface GroupOption {
  name: string
  type: "combinable" | "exclusive"
  options: Option[]
}

export interface Product extends Item {
  groupOptions: GroupOption[]
}

export interface EventWithTypedProducts extends Omit<Event, "products"> {
  products: Product[]
}

export interface CartItem extends Item {
  quantity: number
  comment: string | null
  options: Option[]
}

export interface EventSubscriptionWithTypedCart extends Omit<EventSubscription, "cart"> {
  cart: CartItem[]
}
