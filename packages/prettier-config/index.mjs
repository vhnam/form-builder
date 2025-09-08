export default {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 80,
  useTabs: false,
  tabWidth: 2,
  insertPragma: false,
  requirePragma: false,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
