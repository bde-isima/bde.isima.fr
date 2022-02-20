/// <reference types="react/experimental" />
/// <reference types="react-dom/experimental" />

import type { AppProps, AppProps } from 'blitz'
import type { EmotionCache } from '@emotion/react'
import type { ReactElement, ReactNode } from 'react'

import { User, Event, EventSubscription } from 'db'

import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz'

/**
 * app.tsx related types
 */
export type BDEAppProps = AppProps & {
  emotionCache?: EmotionCache
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
  }
}

/**
 * Events and subscriptions related types
 */
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

/**
 * Average computing related types
 */
interface AverageStoredData {
  averageData: YearData[],
  currentYear: number,
  currentSector?: number
}

interface SubjectData {
  name: string
  coef: number
  mark?: number
}

interface UEData {
  name: string
  subjects: SubjectData[]
  ects: number
  average?: number
}

interface SectorData {
  name: string
  ues: UEData[]

  isCurrent?: boolean
  average?: number
}

interface SemesterData {
  sectors: SectorData[]
  average?: number
}

interface YearData {
  name: string
  semesters: SemesterData[]

  isCurrent?: boolean
  average?: number
}

/**
 * Blitz additional types
 */
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

/**
 * Global types for package.json and gtag typings
 */
export declare global {
  var appName: string
  var website: string
  var version: string
  var description: string

  interface Window {
    gtag: any
  }
}

/**
 * CSS related types
 */
declare module '*.module.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.module.css' {
  const content: { [className: string]: string }
  export default content
}

/**
 * MUI overrides types
 */
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    success: React.CSSProperties
    warning: React.CSSProperties
    error: React.CSSProperties
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    success?: React.CSSProperties
    warning?: React.CSSProperties
    error?: React.CSSProperties
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    success: true
    warning: true
    error: true
  }
}
