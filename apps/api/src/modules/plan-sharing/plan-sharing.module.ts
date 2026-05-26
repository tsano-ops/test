import { Module } from '@nestjs/common';
import { PlanSharingController } from './plan-sharing.controller';
import { PlanSharingService } from './plan-sharing.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PlanSharingController],
  providers: [PlanSharingService],
  exports: [PlanSharingService],
})
export class PlanSharingModule {}
