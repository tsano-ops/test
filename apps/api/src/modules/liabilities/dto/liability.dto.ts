import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { LiabilityCategory } from '@prisma/client';

export class CreateLiabilityDto {
  @IsEnum(LiabilityCategory)
  category: LiabilityCategory;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string = 'EUR';

  @IsOptional()
  @IsNumber()
  interestRate?: number;

  @IsOptional()
  @IsNumber()
  monthlyPayment?: number;

  @IsOptional()
  @IsString()
  dueDate?: string;

  @IsOptional()
  @IsString()
  institution?: string;

  @IsOptional()
  @IsString()
  linkedAssetId?: string;
}

export class UpdateLiabilityDto extends PartialType(CreateLiabilityDto) {}
