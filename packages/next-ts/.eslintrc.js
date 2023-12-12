/** @type {import('eslint').Linter.Config} **/
module.exports = {
  root: false,
  extends: [
    'next/core-web-vitals',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn'
  },
  settings: {
    next: {
      rootDir: 'packages/next-ts/'
    }
  },
  ignorePatterns: ['node_modules', 'dist'],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')]
    }
  }
}
