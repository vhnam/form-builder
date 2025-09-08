import baseConfig from '@repo/prettier-config';

export default {
  ...baseConfig,
  overrides: [
    ...(baseConfig.overrides || []),
    {
      files: '**/*.{ts,tsx}',
      options: {
        importOrder: [
          '^(?!@repo)@?\\w',
          '^@repo/form-ui/types(.*)$',
          '^@repo/core-ui/lib(.*)$',
          '^@repo/form-ui/utils(.*)$',
          '^@repo/core-ui/hooks(.*)$',
          '^@repo/form-ui/hooks(.*)$',
          '^@repo/core-ui/components(.*)$',
          '^@repo/form-ui/components(.*)$',
          '^[./]',
        ],
      },
    },
  ],
};
