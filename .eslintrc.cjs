module.exports = {
  root: true,
  extends: ['@nuxtjs/eslint-config-typescript'],
  rules: {
    'linebreak-style': 'off',
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    // 'style/semi': ['error', 'always']
  },
};
