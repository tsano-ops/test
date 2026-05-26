import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto, UpdateCredentialDto } from './dto/credential.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('credentials')
export class CredentialsController {
  constructor(private credentialsService: CredentialsService) {}

  @Get('asset/:assetId')
  findByAsset(@Req() req: Request, @Param('assetId') assetId: string) {
    return this.credentialsService.findByAsset((req as any).user.sub, assetId);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateCredentialDto) {
    return this.credentialsService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateCredentialDto) {
    return this.credentialsService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.credentialsService.remove((req as any).user.sub, id);
  }
}
