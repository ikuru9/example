module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      jsx: true,
    },
  },
  plugins: ['simple-import-sort', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
  ],
  // add your custom rules here
  rules: {
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn'
  },
}
