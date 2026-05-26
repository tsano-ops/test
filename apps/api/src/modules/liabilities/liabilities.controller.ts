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
import { LiabilitiesService } from './liabilities.service';
import { CreateLiabilityDto, UpdateLiabilityDto } from './dto/liability.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('liabilities')
export class LiabilitiesController {
  constructor(private liabilitiesService: LiabilitiesService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.liabilitiesService.findAll((req as any).user.sub);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateLiabilityDto) {
    return this.liabilitiesService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateLiabilityDto) {
    return this.liabilitiesService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.liabilitiesService.remove((req as any).user.sub, id);
  }
}
