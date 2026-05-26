import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCredentialDto {
  @IsString()
  assetId: string;

  @IsOptional()
  @IsString()
  institution?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsString()
  encryptedPassword?: string;

  @IsOptional()
  @IsString()
  encryptedNotes?: string;

  @IsOptional()
  @IsString()
  url?: string;
}

export class UpdateCredentialDto extends PartialType(CreateCredentialDto) {}
