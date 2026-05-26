import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  MinLength,
} from 'class-validator';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}

export class UpdatePasswordDto {
  @IsString()
  currentPassword: string;

  @IsString()
  @MinLength(8)
  newPassword: string;
}

export class UpdateNotificationsDto {
  @IsOptional()
  @IsBoolean()
  emailNotifications?: boolean;

  @IsOptional()
  @IsBoolean()
  taskReminders?: boolean;

  @IsOptional()
  @IsBoolean()
  planUpdates?: boolean;
}

export class UpdatePreferencesDto {
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}
