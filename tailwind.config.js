const colors = {
  primary: "#2A2E43",
  secondary: "#fff",
  danger: "#C91F37",
}

module.exports = {
  important: true,
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
      },
      backgroundImage: (theme) => ({
        background: "url(/static/images/illustrations/Background.svg)",
        mobileBackground: "url(/static/images/illustrations/MobileBackground.svg)",
      }),
      backgroundColor: (theme) => ({
        ...theme("colors"),
        ...colors,
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        ...colors,
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        ...colors,
      }),
      minWidth: {
        "1/2": "50%",
      },
      minHeight: {
        100: "100px",
        main: "calc(100vh - 64px)",
      },
      maxHeight: {
        card: 345,
      },
    },
  },
  variants: {
    extend: {
      width: ['focus'],
    },
  },
  plugins: [],
}
