import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { PasswordResetService } from './password-reset.service';
import { UsersService } from './users.service';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, PasswordResetService],
  exports: [UsersService, PasswordResetService],
})
export class UsersModule {}
