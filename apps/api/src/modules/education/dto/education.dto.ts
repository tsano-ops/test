import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { EducationType } from '@prisma/client';

export class CreateEducationDto {
  @IsEnum(EducationType) type: EducationType;
  @IsString() institution: string;
  @IsString() @IsOptional() degree?: string;
  @IsString() @IsOptional() fieldOfStudy?: string;
  @IsInt() @IsOptional() yearCompleted?: number;
  @IsString() @IsOptional() certificationName?: string;
  @IsString() @IsOptional() issuingBody?: string;
  @IsString() @IsOptional() notes?: string;
}

export class UpdateEducationDto extends CreateEducationDto {}
