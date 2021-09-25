import { User, Event, EventSubscription } from "db"

declare module "bde" {
  export interface Item {
    name: string
    description: string | null
    price: number
  }

  export type Option = Item

  export interface GroupOption {
    name: string
    type: 'combinable' | 'exclusive'
    options: Option[]
  }

  export interface Product extends Item {
    groupOptions: GroupOption[]
  }

  export interface EventWithTypedProducts extends Omit<Event, 'products'> {
    products: Product[]
  }

  export interface CartItem extends Item {
    quantity: number
    comment: string | null
    options: Option[]
  }

  export interface EventSubscriptionWithTypedCart extends Omit<EventSubscription, 'cart'> {
    cart: CartItem[]
  }
}
