import { IsOptional, IsString } from 'class-validator';

export class LogoutDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
