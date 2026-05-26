import { Module } from '@nestjs/common';
import { LettersController } from './letters.controller';
import { LettersService } from './letters.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LettersController],
  providers: [LettersService],
})
export class LettersModule {}
