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
import { AssetsService } from './assets.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AssetCategory } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.assetsService.findAll((req as any).user.sub);
  }

  @Get('net-worth')
  getNetWorth(@Req() req: Request) {
    return this.assetsService.getNetWorth((req as any).user.sub);
  }

  @Get('category/:category')
  findByCategory(@Req() req: Request, @Param('category') category: AssetCategory) {
    return this.assetsService.findByCategory((req as any).user.sub, category);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateAssetDto) {
    return this.assetsService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateAssetDto) {
    return this.assetsService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.assetsService.remove((req as any).user.sub, id);
  }
}
