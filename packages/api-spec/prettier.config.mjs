import baseConfig from "@repo/prettier-config";

export default {
  ...baseConfig,
  plugins: ["@typespec/prettier-plugin-typespec"],
  overrides: [
    ...(baseConfig.overrides || []),
    {
      files: "**/*.tsp",
      options: {
        detectIndentation: false,
        insertSpaces: true,
        tabSize: 2,
      },
    },
  ],
};
