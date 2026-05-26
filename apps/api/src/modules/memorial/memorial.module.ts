import { Module } from '@nestjs/common';
import { MemorialController } from './memorial.controller';
import { MemorialService } from './memorial.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MemorialController],
  providers: [MemorialService],
})
export class MemorialModule {}
