/**
 * @type {import('eslint').Linter.Config}
*/
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'semi': [1, 'never'],
    '@typescript-eslint/no-explicit-any': 0,
    'max-len': [1, 120],
    'quotes': [1, 'single', { avoidEscape: true, allowTemplateLiterals: true  }],
    'require-await': 1,
    'indent': [2, 2],
    'linebreak-style': [2, 'unix'],
    'no-trailing-spaces': 2,
    'space-before-function-paren': [2, 'always'],
    'object-curly-spacing': [1, 'always'],
    'comma-dangle': [2, 'never'],
    'eol-last': [2, 'always']
  }
}
