const colors = {
  primary: '#2A2E43',
  secondary: '#fff',
  black: '#303030',
  danger: '#C91F37'
}

module.exports = {
  content: ['{app,pages}/**/*.{ts,tsx}'],
  important: true,
  // important: '#__next',
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      screens: {
        xs: '0px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1536px'
        // https://mui.com/customization/breakpoints/#default-breakpoints
      },
      transitionProperty: {
        width: 'width'
      },
      backgroundImage: () => ({
        background: 'url(/static/images/illustrations/Background.svg)',
        mobileBackground: 'url(/static/images/illustrations/MobileBackground.svg)'
      }),
      backgroundColor: (theme) => ({
        ...theme('colors'),
        ...colors
      }),
      textColor: (theme) => ({
        ...theme('colors'),
        ...colors
      }),
      borderColor: (theme) => ({
        ...theme('colors'),
        ...colors
      }),
      minHeight: {
        100: '100px',
        main: 'calc(100vh - 64px)'
      }
    }
  }
}
