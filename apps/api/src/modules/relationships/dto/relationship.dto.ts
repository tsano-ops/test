import { IsString, IsOptional, IsEnum } from 'class-validator';
import { RelationshipType } from '@prisma/client';

export class CreateRelationshipDto {
  @IsString()
  fromProfileId: string;

  @IsString()
  toProfileId: string;

  @IsEnum(RelationshipType)
  type: RelationshipType;

  @IsOptional()
  @IsString()
  customLabel?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateRelationshipDto {
  @IsOptional()
  @IsEnum(RelationshipType)
  type?: RelationshipType;

  @IsOptional()
  @IsString()
  customLabel?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
