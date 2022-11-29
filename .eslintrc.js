module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    node: true,
  },
  extends: ['airbnb-base', 'plugin:import/recommended', 'prettier'],
  rules: {
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
  },
};
