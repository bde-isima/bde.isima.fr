/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

import type { AppProps, AppProps } from 'blitz'
import type { EmotionCache } from '@emotion/react'
import type { ReactElement, ReactNode } from 'react'

import { User, Event, EventSubscription } from 'db'

import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz'

export type BDEAppProps = AppProps & {
  emotionCache?: EmotionCache
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
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

declare module 'blitz' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }

  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized
    PublicData: {
      userId: User['id']
      firstname: string
      lastname: string
      nickname: string | null
      image: string | null
      email: string
      card: number
      roles: string[]
    }
  }
}

export declare global {
  var appName: string
  var website: string
  var version: string
  var description: string

  interface Window {
    gtag: any
  }
}

declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

//@see https://codesandbox.io/s/fontsizetheme-material-demo-forked-l9u05

declare module '@mui/material/styles/createTypography' {
  interface Typography {
    success: React.CSSProperties
    warning: React.CSSProperties
    error: React.CSSProperties
  }

  interface TypographyOptions {
    success?: React.CSSProperties
    warning: React.CSSProperties
    error: React.CSSProperties
  }
}

declare module '@mui/material/Typography/Typography' {
  interface TypographyPropsVariantOverrides {
    success: true
    warning: true
    error: true
  }
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
