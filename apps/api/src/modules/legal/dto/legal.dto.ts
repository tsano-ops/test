import { IsString, IsOptional, IsIn } from 'class-validator';

export type LegalDocumentType =
  | 'WILL'
  | 'TRUST'
  | 'POA'
  | 'GUARDIANSHIP'
  | 'ADVANCE_DIRECTIVE'
  | 'BUSINESS_CONTINUITY';

const LEGAL_DOCUMENT_TYPES: LegalDocumentType[] = [
  'WILL',
  'TRUST',
  'POA',
  'GUARDIANSHIP',
  'ADVANCE_DIRECTIVE',
  'BUSINESS_CONTINUITY',
];

export class CreateLegalDocumentDto {
  @IsIn(LEGAL_DOCUMENT_TYPES)
  type: LegalDocumentType;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  documentId?: string;

  @IsOptional()
  @IsString()
  templateUrl?: string;
}

export class UpdateLegalDocumentDto {
  @IsOptional()
  @IsIn(LEGAL_DOCUMENT_TYPES)
  type?: LegalDocumentType;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  documentId?: string;

  @IsOptional()
  @IsString()
  templateUrl?: string;
}
