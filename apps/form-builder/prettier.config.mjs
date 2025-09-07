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
          '^@repo/(.*)$',
          '^@/constants/(.*)$',
          '^@/hooks/(.*)$',
          '^@/providers/(.*)$',
          '^@/schemas/(.*)$',
          '^@/services/(.*)$',
          '^@/components/(.*)$',
          '^@/modules/(.*)$',
          '^[./]',
          '^@/mocks/(.*)$',
        ],
      },
    },
  ],
};
