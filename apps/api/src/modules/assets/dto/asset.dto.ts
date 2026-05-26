import {
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
  IsObject,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { AssetCategory } from '@prisma/client';

export class CreateAssetDto {
  @IsEnum(AssetCategory)
  category: AssetCategory;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  currency?: string = 'EUR';

  @IsOptional()
  @IsString()
  institution?: string;

  @IsOptional()
  @IsString()
  accountNumber?: string;

  @IsOptional()
  @IsObject()
  ownershipDetails?: any;

  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class UpdateAssetDto extends PartialType(CreateAssetDto) {}
