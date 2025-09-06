export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  insertPragma: false,
  requirePragma: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
