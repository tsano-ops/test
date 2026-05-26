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
import { FamilyService } from './family.service';
import { CreateFamilyMemberDto, UpdateFamilyMemberDto } from './dto/family.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('family')
export class FamilyController {
  constructor(private familyService: FamilyService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.familyService.findAll((req as any).user.sub);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.familyService.findOne((req as any).user.sub, id);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateFamilyMemberDto) {
    return this.familyService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateFamilyMemberDto,
  ) {
    return this.familyService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.familyService.remove((req as any).user.sub, id);
  }
}
