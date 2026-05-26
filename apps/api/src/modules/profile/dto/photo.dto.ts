import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// 🚀 We define the enum directly here so TypeScript doesn't rely on Prisma to build!
export enum PhotoPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

export class UploadPhotoDto {
  @IsNumber() @IsOptional() @Type(() => Number) cropX?: number;
  @IsNumber() @IsOptional() @Type(() => Number) cropY?: number;
  @IsNumber() @IsOptional() @Type(() => Number) cropWidth?: number;
  @IsNumber() @IsOptional() @Type(() => Number) cropHeight?: number;
}

export class UpdatePhotoPrivacyDto {
  @IsEnum(PhotoPrivacy) privacy: PhotoPrivacy;
}