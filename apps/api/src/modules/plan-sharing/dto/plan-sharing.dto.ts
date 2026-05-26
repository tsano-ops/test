import { IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ShareRole } from '@prisma/client';

export class InviteDto {
  @IsEmail()
  email: string;

  @IsEnum(ShareRole)
  role: ShareRole;
}

export class UpdateShareDto {
  @IsOptional()
  permissions?: Record<string, any>;
}
