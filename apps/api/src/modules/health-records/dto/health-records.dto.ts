import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';

export class UpdateEmergencyDto {
  @IsOptional()
  @IsString()
  bloodType?: string;

  @IsOptional()
  @IsArray()
  conditions?: Array<{ name: string; status?: string; notes?: string }>;

  @IsOptional()
  @IsArray()
  medications?: Array<{ name: string; dosage?: string; frequency?: string }>;

  @IsOptional()
  @IsArray()
  emergencyContacts?: Array<{ name: string; phone: string; relationship?: string }>;
}

export class UpdateGettingOldDto {
  @IsOptional()
  @IsString()
  carePreferences?: string;

  @IsOptional()
  @IsString()
  painManagement?: string;

  @IsOptional()
  @IsString()
  hospicePreferences?: string;

  @IsOptional()
  @IsString()
  spiritualNeeds?: string;

  @IsOptional()
  @IsString()
  healthPoaName?: string;

  @IsOptional()
  @IsString()
  healthPoaContact?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateEndOfLifeDto {
  @IsOptional()
  @IsBoolean()
  organDonation?: boolean;

  @IsOptional()
  @IsString()
  organDonationDetails?: string;

  @IsOptional()
  @IsString()
  funeralPreferences?: string;

  @IsOptional()
  @IsBoolean()
  prePaidArrangements?: boolean;

  @IsOptional()
  @IsString()
  prePaidDetails?: string;

  @IsOptional()
  @IsString()
  obituaryDraft?: string;

  @IsOptional()
  @IsString()
  burialLocation?: string;
}
