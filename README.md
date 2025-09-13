# Loki Form Builder

A modern, drag-and-drop form builder application built with Next.js and TypeScript, organized as a Turborepo monorepo. Create dynamic forms with various field types, conditional logic, and real-time preview capabilities.

## What's inside?

This Turborepo includes the following packages/apps:

### Applications

- **`form-builder`**: Main form builder application built with Next.js 15 with App Router
- **`form-builder-server`**: NestJS API server for form builder backend services

### Packages

- **`@repo/core-ui`**: Design system and reusable UI components (React library)
- **`@repo/form-ui`**: Form-specific UI components and logic (depends on core-ui)
- **`api-spec`**: TypeSpec API specification and OpenAPI documentation
- **`@repo/eslint-config`**: Shared ESLint configurations
- **`@repo/typescript-config`**: Shared TypeScript configurations
- **`@repo/prettier-config`**: Shared Prettier configuration

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/) with strict mode enabled.

## Features

- **Drag & Drop Form Builder**: Intuitive interface for creating forms
- **Multiple Field Types**: Text, email, select, checkbox, date, and textarea fields
- **Conditional Logic**: Create dynamic forms with conditional field visibility
- **Real-time Preview**: See your form as you build it
- **Form Management**: Create, edit, delete, and organize your forms
- **Authentication**: Secure user authentication and authorization
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9 (strict mode)
- **Styling**: TailwindCSS v4
- **State Management**: React Query (TanStack Query), Zustand
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom design system with Shadcn UI

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL with Drizzle ORM
- **API Documentation**: TypeSpec with OpenAPI 3.0

### Development Tools

- **Package Manager**: pnpm 9.0.0
- **Build Tool**: Turborepo 2.5.6
- **Linting**: ESLint
- **Formatting**: Prettier 3.6.2
- **Testing**: Vitest (form-ui), Jest (server)

## Getting Started

### Prerequisites

- Node.js >= 22
- pnpm 9.0.0

### Installation

```sh
# Install dependencies
pnpm install
```

### Quick Start

```sh
# Start all development servers (frontend + backend)
pnpm dev

# Or start specific services:
# Frontend only (runs on http://localhost:3000)
pnpm dev --filter=form-builder

# Backend only (runs on http://localhost:4000)
pnpm dev --filter=form-builder-server

# Open your browser to http://localhost:3000
# Start building forms!
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

# Build core-ui package
pnpm build --filter=@repo/core-ui

# Build form-ui package
pnpm build --filter=@repo/form-ui
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

# Start form-builder-server (runs on http://localhost:4000)
pnpm dev --filter=form-builder-server
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
loki-form/
├── apps/
│   ├── form-builder/          # Main form builder application (Next.js)
│   └── form-builder-server/   # Backend API server (NestJS)
├── packages/
│   ├── core-ui/              # Design system components
│   ├── form-ui/              # Form-specific components
│   ├── api-spec/             # TypeSpec API specification
│   ├── eslint-config/        # Shared ESLint configs
│   ├── typescript-config/    # Shared TypeScript configs
│   └── prettier-config/      # Shared Prettier config
├── package.json              # Root package.json
├── pnpm-workspace.yaml       # pnpm workspace config
└── turbo.json                # Turborepo config
```

## Package Dependencies

- **form-builder** → `@repo/core-ui`, `@repo/form-ui`
- **form-builder-server** → (standalone NestJS application)
- **form-ui** → `@repo/core-ui`
- **core-ui** → (no internal dependencies)
- **api-spec** → (standalone TypeSpec specification)

## API Documentation

The project includes a TypeSpec API specification that generates OpenAPI documentation:

```sh
# Generate API documentation
pnpm --filter=api-spec preview

# View documentation at http://localhost:1234
```

## Database Setup

The backend uses PostgreSQL with Drizzle ORM:

```sh
# Generate database migrations
pnpm --filter=form-builder-server db:generate

# Run migrations
pnpm --filter=form-builder-server db:migrate

# Open Drizzle Studio (database GUI)
pnpm --filter=form-builder-server db:studio
```

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

### Core Technologies

- [Turborepo Documentation](https://turborepo.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [pnpm Documentation](https://pnpm.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### UI & Styling

- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [React Hook Form Documentation](https://react-hook-form.com/)

### Database & API

- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [TypeSpec Documentation](https://typespec.io/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Development Tools

- [React Query Documentation](https://tanstack.com/query/latest)
- [Zod Documentation](https://zod.dev/)
- [Vitest Documentation](https://vitest.dev/)
