import { IsString, IsOptional, IsEnum, IsDateString, IsArray } from 'class-validator';
import { Gender, MaritalStatus } from '@prisma/client';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsOptional()
  @IsString()
  placeOfBirth?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  citizenships?: string[];

  @IsOptional()
  @IsDateString()
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
  @IsString()
  stateRegion?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}
