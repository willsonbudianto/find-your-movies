module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'config.ts', 'config.development.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-refresh', 'react-hooks', '@typescript-eslint', 'prettier'],
  rules: {
    'react/jsx-sort-props': [
      'error',
      {
        callbacksLast: true,
        shorthandFirst: true,
        shorthandLast: false,
        ignoreCase: true,
        noSortAlphabetically: false,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    camelcase: 'off',
    'spaced-comment': 'error',
    quotes: ['error', 'single', { avoidEscape: true }],
    'no-duplicate-imports': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          String: true,
          Object: true,
          Function: false,
        },
        extendDefaults: true,
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['export', 'return', 'if', 'break', 'throw', 'continue', 'case', 'default'],
      },
      {
        blankLine: 'never',
        prev: '*',
        next: ['import'],
      },
      { blankLine: 'always', prev: ['const', 'let', 'var', 'if'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-fallthrough': ['error', { allowEmptyCase: true }],
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
}
