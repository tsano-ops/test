import { Module } from '@nestjs/common';
import { PostLossController } from './post-loss.controller';
import { PostLossService } from './post-loss.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PostLossController],
  providers: [PostLossService],
})
export class PostLossModule {}
