import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class CreateEmploymentDto {
  @IsString() employer: string;
  @IsString() position: string;
  @IsString() @IsOptional() startDate?: string;
  @IsString() @IsOptional() endDate?: string;
  @IsBoolean() @IsOptional() isCurrent?: boolean;
  @IsString() @IsOptional() contactName?: string;
  @IsEmail() @IsOptional() contactEmail?: string;
  @IsString() @IsOptional() contactPhone?: string;
  @IsString() @IsOptional() notes?: string;
}

export class UpdateEmploymentDto extends CreateEmploymentDto {}
