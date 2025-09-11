import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PasswordResetService } from './password-reset.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, PasswordResetService],
  exports: [UsersService, PasswordResetService],
})
export class UsersModule {}
