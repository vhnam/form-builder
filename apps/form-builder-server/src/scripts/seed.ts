import * as bcrypt from 'bcrypt';
import { drizzle } from 'drizzle-orm/postgres-js';
import { reset, seed } from 'drizzle-seed';
import postgres from 'postgres';

import { users } from '../database/schema';

async function main() {
  const connection = postgres(getConnectionString());
  const db = drizzle(connection);

  console.log('🌱 Starting database seeding...');

  // Reset the database first
  console.log('🔄 Resetting database...');
  await reset(db, { users });
  console.log('✅ Database reset completed');

  // Generate password hash
  const password = 'Azxcv!123';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('🔐 Generated hash for password');

  // Seed superadmin user
  await seed(db, { users }).refine((funcs) => ({
    users: {
      count: 1,
      columns: {
        email: funcs.valuesFromArray({
          values: ['sa@lokiform.io'],
        }),
        firstName: funcs.valuesFromArray({
          values: ['Vincent'],
        }),
        lastName: funcs.valuesFromArray({
          values: ['Wu'],
        }),
        password: funcs.valuesFromArray({
          values: [hashedPassword],
        }),
        role: funcs.valuesFromArray({
          values: ['superadmin'],
        }),
        interfaceMode: funcs.valuesFromArray({
          values: ['system'],
        }),
        interfaceLanguage: funcs.valuesFromArray({
          values: ['en-US'],
        }),
        isActive: funcs.valuesFromArray({
          values: [true],
        }),
      },
    },
  }));

  console.log('✅ Superadmin account seeded successfully!');
  console.log('📧 Email: sa@lokiform.io');
  console.log('🔑 Password:', password);
  console.log('⚠️  IMPORTANT: Please change the password after first login!');

  await connection.end();
  console.log('📦 Database connection closed');
}

function getConnectionString(): string {
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = process.env.DATABASE_PORT || '5432';
  const user = process.env.DATABASE_USER || 'loki_form';
  const password = process.env.DATABASE_PASSWORD || 'loki_form';
  const database = process.env.DATABASE_NAME || 'loki_form';

  return `postgresql://${user}:${password}@${host}:${port}/${database}`;
}

main().catch((error) => {
  console.error('❌ Error seeding database:', error);
  process.exit(1);
});
