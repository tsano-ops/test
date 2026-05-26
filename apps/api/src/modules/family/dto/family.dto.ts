import {
  IsString,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Gender, MaritalStatus } from '@prisma/client';

export class CreateFamilyMemberDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  countryOfResidence?: string;

  @IsOptional()
  @IsBoolean()
  isDeceased?: boolean;

  @IsOptional()
  @IsString()
  dateOfDeath?: string;

  @IsOptional()
  @IsString()
  causeOfDeath?: string;

  @IsOptional()
  @IsString()
  legacyNotes?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class UpdateFamilyMemberDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsEnum(MaritalStatus)
  maritalStatus?: MaritalStatus;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsString()
  countryOfResidence?: string;

  @IsOptional()
  @IsBoolean()
  isDeceased?: boolean;

  @IsOptional()
  @IsString()
  dateOfDeath?: string;

  @IsOptional()
  @IsString()
  causeOfDeath?: string;

  @IsOptional()
  @IsString()
  legacyNotes?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}
