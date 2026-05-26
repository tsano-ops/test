import {
  IsString,
  IsOptional,
  IsEnum,
  IsEmail,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { Gender, MaritalStatus, ContactType, AllergySeverity, EducationType } from '@prisma/client';

export class UpdateEssentialDto {
  @IsString() @IsOptional() firstName?: string;
  @IsString() @IsOptional() lastName?: string;
  @IsString() @IsOptional() dateOfBirth?: string;
  @IsEnum(Gender) @IsOptional() gender?: Gender;
  @IsEnum(MaritalStatus) @IsOptional() maritalStatus?: MaritalStatus;
  @IsString() @IsOptional() nationality?: string;
  @IsString() @IsOptional() countryOfResidence?: string;
  @IsString() @IsOptional() stateRegion?: string;
  @IsString() @IsOptional() photoUrl?: string;
}

export class CreateContactDto {
  @IsEnum(ContactType) type: ContactType;
  @IsString() @IsOptional() label?: string;
  @IsString() value: string;
  @IsBoolean() @IsOptional() isPrimary?: boolean;
  @IsString() @IsOptional() street?: string;
  @IsString() @IsOptional() city?: string;
  @IsString() @IsOptional() state?: string;
  @IsString() @IsOptional() postalCode?: string;
  @IsString() @IsOptional() country?: string;
  @IsString() @IsOptional() platform?: string;
  @IsString() @IsOptional() profileUrl?: string;
}

export class UpdateContactDto extends CreateContactDto {}

export class CreateMedicalRecordDto {
  @IsString() @IsOptional() bloodType?: string;
  @IsString() @IsOptional() conditionName?: string;
  @IsString() @IsOptional() diagnosedDate?: string;
  @IsString() @IsOptional() status?: string;
  @IsString() @IsOptional() notes?: string;
}

export class UpdateMedicalRecordDto extends CreateMedicalRecordDto {}

export class CreateAllergyDto {
  @IsString() name: string;
  @IsEnum(AllergySeverity) severity: AllergySeverity;
  @IsString() @IsOptional() reaction?: string;
  @IsString() @IsOptional() notes?: string;
}

export class UpdateAllergyDto extends CreateAllergyDto {}

export class CreateBeliefDto {
  @IsString() category: string;
  @IsString() name: string;
  @IsString() @IsOptional() description?: string;
}

export class UpdateBeliefDto extends CreateBeliefDto {}
