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
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)'
      },
      backgroundColor: (theme) => theme('colors'),
      textColor: (theme) => theme('colors'),
      borderColor: (theme) => theme('colors'),
      minHeight: {
        100: '100px',
        main: 'calc(100vh - 64px)'
      }
    }
  }
};
