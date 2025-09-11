import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseService } from '../database/database.service';
import { users, User, NewUser } from '../database/schema';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(emailOrId: string): Promise<User | undefined> {
    // First try to find by email
    let result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, emailOrId))
      .limit(1);

    // If not found by email, try by ID
    if (!result[0]) {
      result = await this.databaseService.db
        .select()
        .from(users)
        .where(eq(users.id, emailOrId))
        .limit(1);
    }

    return result[0];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return result[0];
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await this.databaseService.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0];
  }

  async create(userData: NewUser): Promise<User> {
    const result = await this.databaseService.db
      .insert(users)
      .values(userData)
      .returning();

    return result[0];
  }

  async update(
    id: string,
    userData: Partial<NewUser>,
  ): Promise<User | undefined> {
    const result = await this.databaseService.db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();

    return result[0];
  }
}
