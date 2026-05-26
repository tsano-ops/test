import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { PhotoPrivacy } from '@prisma/client';
import { Type } from 'class-transformer';

export class UploadPhotoDto {
  @IsNumber() @IsOptional() @Type(() => Number) cropX?: number;
  @IsNumber() @IsOptional() @Type(() => Number) cropY?: number;
  @IsNumber() @IsOptional() @Type(() => Number) cropWidth?: number;
  @IsNumber() @IsOptional() @Type(() => Number) cropHeight?: number;
}

export class UpdatePhotoPrivacyDto {
  @IsEnum(PhotoPrivacy) privacy: PhotoPrivacy;
}
