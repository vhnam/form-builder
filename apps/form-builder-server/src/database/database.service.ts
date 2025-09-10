import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: postgres.Sql;
  public db: ReturnType<typeof drizzle>;

  constructor() {
    const connectionString = this.getConnectionString();
    this.connection = postgres(connectionString, {
      max: 20,
      idle_timeout: 20,
      connect_timeout: 10,
    });

    this.db = drizzle(this.connection, { schema });
  }

  async onModuleInit() {
    console.log('📦 Database connection established');
  }

  async onModuleDestroy() {
    await this.connection.end();
    console.log('📦 Database connection closed');
  }

  private getConnectionString(): string {
    const host = process.env.DATABASE_HOST || 'localhost';
    const port = process.env.DATABASE_PORT || '5432';
    const user = process.env.DATABASE_USER || 'postgres';
    const password = process.env.DATABASE_PASSWORD || 'password';
    const database = process.env.DATABASE_NAME || 'form_builder';

    return `postgresql://${user}:${password}@${host}:${port}/${database}`;
  }
}
