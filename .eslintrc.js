module.exports = {
  extends: ['blitz'],
  rules: {
    'jsx-a11y/anchor-has-content': 'off',
    'no-restricted-imports': ['error', { patterns: ['@mui/*/*/*', '!@mui/material/test-utils/*'] }],
  },
}
