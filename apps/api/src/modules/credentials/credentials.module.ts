import { Module } from '@nestjs/common';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CredentialsController],
  providers: [CredentialsService],
})
export class CredentialsModule {}
