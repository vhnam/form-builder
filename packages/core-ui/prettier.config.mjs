import baseConfig from "@repo/prettier-config";

export default {
  ...baseConfig,
  overrides: [
    ...(baseConfig.overrides || []),
    {
      files: "**/*.{ts,tsx}",
      options: {
        importOrder: [
          "^@?\\w",
          "^@/components/(.*)$",
          "^@/lib/(.*)$",
          "^[./]",
        ],
      },
    },
  ],
};
