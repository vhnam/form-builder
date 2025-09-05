# Form Builder Monorepo

A modern form builder application built with Next.js and TypeScript, organized as a Turborepo monorepo.

## What's inside?

This Turborepo includes the following packages/apps:

### Applications

- **`form-builder`**: Main form builder application built with Next.js 15
- **`docs`**: Documentation site built with Next.js 15

### Packages

- **`@repo/core-ui`**: Design system and reusable UI components (React library)
- **`@repo/form-ui-library`**: Form-specific UI components and logic (depends on core-ui)
- **`@repo/eslint-config`**: Shared ESLint configurations
- **`@repo/typescript-config`**: Shared TypeScript configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict mode enabled.

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9 (strict mode)
- **Package Manager**: pnpm 9.0.0
- **Build Tool**: Turborepo 2.5.6
- **Styling**: CSS Modules
- **Linting**: ESLint 9.34.0
- **Formatting**: Prettier 3.6.2

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm 9.0.0

### Installation

```sh
# Install dependencies
pnpm install
```

## Development

### Build

To build all apps and packages:

```sh
pnpm build
```

To build a specific package:

```sh
# Build form-builder app
pnpm build --filter=form-builder

# Build docs app
pnpm build --filter=docs

# Build core-ui package
pnpm build --filter=@repo/core-ui

# Build form-ui-library package
pnpm build --filter=@repo/form-ui-library
```

### Development Server

To start all development servers:

```sh
pnpm dev
```

To start a specific app:

```sh
# Start form-builder app (runs on http://localhost:3000)
pnpm dev --filter=form-builder

# Start docs app (runs on http://localhost:3001)
pnpm dev --filter=docs
```

### Linting and Type Checking

```sh
# Lint all packages
pnpm lint

# Check types across all packages
pnpm check-types

# Format code
pnpm format
```

## Project Structure

```
form-builder/
├── apps/
│   ├── form-builder/          # Main form builder application
│   └── docs/                  # Documentation site
├── packages/
│   ├── core-ui/              # Design system components
│   ├── form-ui-library/      # Form-specific components
│   ├── eslint-config/        # Shared ESLint configs
│   └── typescript-config/    # Shared TypeScript configs
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # pnpm workspace config
└── turbo.json               # Turborepo config
```

## Package Dependencies

- **form-builder** → `@repo/core-ui`, `@repo/form-ui-library`
- **docs** → `@repo/core-ui`
- **form-ui-library** → `@repo/core-ui`
- **core-ui** → (no internal dependencies)

## Remote Caching

This project uses Turborepo's remote caching for faster builds. To enable remote caching:

```sh
# Login to Vercel (if you have an account)
npx turbo login

# Link your repository to remote cache
npx turbo link
```

## Contributing

1. Make sure you have the prerequisites installed
2. Install dependencies: `pnpm install`
3. Start development servers: `pnpm dev`
4. Make your changes
5. Run linting and type checking: `pnpm lint && pnpm check-types`
6. Format your code: `pnpm format`

## Useful Links

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [pnpm Documentation](https://pnpm.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
