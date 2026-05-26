import { Module } from '@nestjs/common';
import { RelationshipsController } from './relationships.controller';
import { RelationshipsService } from './relationships.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RelationshipsController],
  providers: [RelationshipsService],
})
export class RelationshipsModule {}
