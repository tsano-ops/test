import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  findAll(@Req() req: Request, @Query('category') category?: string) {
    return this.documentsService.findAll((req as any).user.sub, category);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateDocumentDto) {
    return this.documentsService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateDocumentDto) {
    return this.documentsService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.documentsService.remove((req as any).user.sub, id);
  }
}
