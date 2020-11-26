module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  extends: [
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
  ],
  plugins: [
    'json',
  ],
  globals: {
    window: true,
    document: true,
  },
  rules: {
    'import/unambiguous': 'off',
    'import/extensions': 'off',
    'import/no-unassigned-import': 'off',
    'node/no-sync': 'off',
  },
  ignorePatterns: [
    '!.eslintrc.js',
    'node_modules/',
    'dist/',
    'build/temp',
  ],
}
