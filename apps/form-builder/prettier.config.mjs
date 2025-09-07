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
          '^@/constants/(.*)$',
          '^@repo/core-ui/lib(.*)$',
          '^@/hooks/(.*)$',
          '^@repo/core-ui/hooks(.*)$',
          '^@/providers/(.*)$',
          '^@/schemas/(.*)$',
          '^@repo/form-ui/types(.*)$',
          '^@/services/(.*)$',
          '^@/components/(.*)$',
          '^@repo/core-ui/components(.*)$',
          '^@repo/form-ui/components(.*)$',
          '^@/modules/(.*)$',
          '^[./]',
          '^@/mocks/(.*)$',
        ],
      },
    },
  ],
};
