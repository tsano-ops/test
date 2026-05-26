import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { EmploymentService } from './employment.service';
import { CreateEmploymentDto, UpdateEmploymentDto } from './dto/employment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('employment')
export class EmploymentController {
  constructor(private employmentService: EmploymentService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.employmentService.findAll((req as any).user.sub);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateEmploymentDto) {
    return this.employmentService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateEmploymentDto) {
    return this.employmentService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.employmentService.remove((req as any).user.sub, id);
  }
}
