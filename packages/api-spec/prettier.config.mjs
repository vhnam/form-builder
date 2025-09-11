import baseConfig from "@repo/prettier-config";

const {
  importOrderSeparation,
  importOrderSortSpecifiers,
  plugins,
  ...omittedProperties
} = baseConfig;

export default {
  ...omittedProperties,
  plugins: ["@typespec/prettier-plugin-typespec"],
  overrides: [
    ...(baseConfig.overrides || []),
    {
      files: "**/*.tsp",
      options: {
        useTabs: false,
        tabWidth: 2,
      },
    },
  ],
};
