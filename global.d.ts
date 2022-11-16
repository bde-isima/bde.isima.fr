import type { ReactElement, ReactNode } from 'react';

import type { AppProps } from 'blitz';
import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from 'blitz';
import { User, Event, EventSubscription } from 'db';

export type BDEAppProps = AppProps & {
  Component: NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
  };
};

export type Address = {
  name: string;
  zipCode: string;
  city: string;
};

export interface Item {
  name: string;
  description: string | null;
  price: number;
}

export type Option = Item;

export interface GroupOption {
  name: string;
  type: 'combinable' | 'exclusive';
  options: Option[];
}

export interface Product extends Item {
  groupOptions: GroupOption[];
}

export interface EventWithTypedProducts extends Omit<Event, 'products'> {
  products: Product[];
}

export interface CartItem extends Item {
  quantity: number;
  comment: string | null;
  options: Option[];
}

export interface EventSubscriptionWithTypedCart extends Omit<EventSubscription, 'cart'> {
  cart: CartItem[];
}

declare module '@blitzjs/auth' {
  export interface Ctx extends DefaultCtx {
    session: SessionContext;
  }

  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized;
    PublicData: {
      userId: User['id'];
      firstname: string;
      lastname: string;
      nickname: string | null;
      image: string | null;
      email: string;
      card: number;
      roles: string[];
      address: Address;
    };
  }
}

declare global {
  var appName: string;
  var website: string;
  var version: string;
  var description: string;

  interface Window {
    gtag: any;
  }
}

declare module '*.module.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    success: React.CSSProperties;
    warning: React.CSSProperties;
    error: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    success?: React.CSSProperties;
    warning?: React.CSSProperties;
    error?: React.CSSProperties;
  }

  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    neutral: true;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    success: true;
    warning: true;
    error: true;
  }
}
