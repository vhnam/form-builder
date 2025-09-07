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
          '^@repo/core-ui/lib/(.*)$',
          '^@repo/core-ui/hooks/(.*)$',
          '^@repo/form-ui/types/(.*)$',
          '^@repo/form-ui/components/(.*)$',
          '^@repo/core-ui/components/(.*)$',
          '^[./]',
        ],
      },
    },
  ],
};
