import { Module } from '@nestjs/common';
import { EmploymentController } from './employment.controller';
import { EmploymentService } from './employment.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmploymentController],
  providers: [EmploymentService],
})
export class EmploymentModule {}
