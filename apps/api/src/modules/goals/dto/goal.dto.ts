import { IsString, IsOptional, IsIn, IsNumber, Min, Max } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(['ANNUAL', 'ASPIRATION', 'BUCKET_LIST'])
  type: 'ANNUAL' | 'ASPIRATION' | 'BUCKET_LIST';

  @IsOptional()
  @IsString()
  deadline?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPct?: number;

  @IsOptional()
  @IsString()
  category?: string;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(['ANNUAL', 'ASPIRATION', 'BUCKET_LIST'])
  type?: 'ANNUAL' | 'ASPIRATION' | 'BUCKET_LIST';

  @IsOptional()
  @IsString()
  deadline?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progressPct?: number;

  @IsOptional()
  @IsString()
  category?: string;
}
