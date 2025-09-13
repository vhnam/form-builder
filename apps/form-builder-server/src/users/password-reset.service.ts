import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DatabaseService } from '../database/database.service';
import {
  NewPasswordResetToken,
  PasswordResetToken,
  passwordResetTokens,
} from '../database/schema';

@Injectable()
export class PasswordResetService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(tokenData: NewPasswordResetToken): Promise<PasswordResetToken> {
    const result = await this.databaseService.db
      .insert(passwordResetTokens)
      .values(tokenData)
      .returning();

    return result[0];
  }

  async findByToken(token: string): Promise<PasswordResetToken | undefined> {
    const result = await this.databaseService.db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1);

    return result[0];
  }

  async findValidToken(token: string): Promise<PasswordResetToken | undefined> {
    const result = await this.databaseService.db
      .select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, token),
          eq(passwordResetTokens.isUsed, false)
        )
      )
      .limit(1);

    return result[0];
  }

  async markAsUsed(id: string): Promise<void> {
    await this.databaseService.db
      .update(passwordResetTokens)
      .set({ isUsed: true })
      .where(eq(passwordResetTokens.id, id));
  }

  async invalidateUserTokens(userId: string): Promise<void> {
    await this.databaseService.db
      .update(passwordResetTokens)
      .set({ isUsed: true })
      .where(
        and(
          eq(passwordResetTokens.userId, userId),
          eq(passwordResetTokens.isUsed, false)
        )
      );
  }
}
