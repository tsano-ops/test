import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsObject,
} from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  fileName: string;

  @IsString()
  fileType: string;

  @IsNumber()
  fileSize: number;

  @IsString()
  s3Key: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metadata?: any;
}

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsObject()
  metadata?: any;
}
