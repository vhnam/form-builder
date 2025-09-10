# Form Builder Server

A NestJS API server for the Form Builder application, built with Drizzle ORM and PostgreSQL.

## Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **Drizzle ORM**: Type-safe database operations with PostgreSQL
- **Health Checks**: Database and service health monitoring
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v13 or higher)
- pnpm

### Installation

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

```bash
cp env.example .env
```

3. Update the `.env` file with your database credentials:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=form_builder
PORT=3001
```

4. Set up the database:

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate
```

### Development

Start the development server:

```bash
pnpm start:dev
```

The server will be available at:

- API: http://localhost:3001
- Health Check: http://localhost:3001/health

### Database Commands

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate

# Push schema changes (for development)
pnpm db:push

# Open Drizzle Studio (database GUI)
pnpm db:studio
```

## Project Structure

```
src/
├── database/
│   ├── schema/          # Database schemas
│   ├── database.module.ts
│   └── database.service.ts
├── health/              # Health check endpoints
├── app.module.ts        # Main application module
└── main.ts             # Application entry point
```

## Database Schema

The application includes the following main entities:

- **Users**: User accounts and authentication
- **Forms**: Form definitions and metadata
- **Questions**: Individual form questions with types and validation
- **Responses**: Form submissions and answers

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation as needed
4. Ensure all linting passes

## License

This project is part of the Form Builder monorepo.
