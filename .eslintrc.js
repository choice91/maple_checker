module.exports = {
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  globals: {
    window: true,
    document: true,
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
