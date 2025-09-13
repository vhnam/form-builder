import { IsIn, IsOptional, IsString, MinLength } from 'class-validator';

import * as users from '../../database/schema/users';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsIn(['light', 'dark', 'system'])
  interfaceMode?: users.InterfaceMode;

  @IsOptional()
  @IsIn(['en-US', 'vi-VN'])
  interfaceLanguage?: users.InterfaceLanguage;
}
