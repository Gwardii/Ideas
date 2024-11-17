module.exports = {
  env: { node: true, browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
  },
};
