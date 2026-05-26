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
import { LegalService } from './legal.service';
import { CreateLegalDocumentDto, UpdateLegalDocumentDto } from './dto/legal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('legal')
export class LegalController {
  constructor(private legalService: LegalService) {}

  @Get('documents')
  findAll(@Req() req: Request) {
    return this.legalService.findAll((req as any).user.sub);
  }

  @Get('documents/:type')
  findByType(@Req() req: Request, @Param('type') type: string) {
    return this.legalService.findByType((req as any).user.sub, type);
  }

  @Post('documents')
  create(@Req() req: Request, @Body() dto: CreateLegalDocumentDto) {
    return this.legalService.create((req as any).user.sub, dto);
  }

  @Patch('documents/:id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateLegalDocumentDto,
  ) {
    return this.legalService.update((req as any).user.sub, id, dto);
  }

  @Delete('documents/:id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.legalService.remove((req as any).user.sub, id);
  }
}
