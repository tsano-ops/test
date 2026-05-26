import { IsString, IsOptional, IsEnum } from 'class-validator';
import { LetterDeliveryTrigger } from '@prisma/client';

export class CreateLetterDto {
  @IsString()
  recipientProfileId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(LetterDeliveryTrigger)
  deliveryTrigger: LetterDeliveryTrigger;

  @IsOptional()
  @IsString()
  triggerDate?: string;
}

export class UpdateLetterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(LetterDeliveryTrigger)
  deliveryTrigger?: LetterDeliveryTrigger;

  @IsOptional()
  @IsString()
  triggerDate?: string;
}
