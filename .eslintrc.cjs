module.exports = {
  root: true,
  extends: ['prettier', 'airbnb-base', '@nuxtjs/eslint-config-typescript'],
  rules: {
    'linebreak-style': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
  },
};
