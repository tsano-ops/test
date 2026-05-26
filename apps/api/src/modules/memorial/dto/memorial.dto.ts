import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateMemorialDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  dateOfPassing?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  biography?: string;

  @IsOptional()
  @IsString()
  tributeMessage?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
