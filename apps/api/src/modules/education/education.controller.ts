import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { EducationService } from './education.service';
import { CreateEducationDto, UpdateEducationDto } from './dto/education.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.educationService.findAll((req as any).user.sub);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateEducationDto) {
    return this.educationService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateEducationDto) {
    return this.educationService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.educationService.remove((req as any).user.sub, id);
  }
}
