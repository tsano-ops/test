import { IsEmail, IsString, MinLength, MaxLength, Matches, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @MaxLength(64)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message: 'Password must contain uppercase, lowercase, number, and special character',
  })
  password: string;

  @IsOptional()
  @IsString()
  accessCode?: string;

  @IsOptional()
  @IsString()
  signupSource?: string; // 'website' | 'insurance' | 'employer' | 'access_code'
}

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  code: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
