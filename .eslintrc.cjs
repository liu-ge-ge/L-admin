module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: 'vue-eslint-psrser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off', // 除import语句外，禁止使用require语句
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
      },
    ],
  },
}
