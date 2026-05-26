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
import { LettersService } from './letters.service';
import { CreateLetterDto, UpdateLetterDto } from './dto/letter.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('letters')
export class LettersController {
  constructor(private lettersService: LettersService) {}

  @Get()
  findAll(@Req() req: Request) {
    return this.lettersService.findAll((req as any).user.sub);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.lettersService.findOne((req as any).user.sub, id);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateLetterDto) {
    return this.lettersService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateLetterDto,
  ) {
    return this.lettersService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.lettersService.remove((req as any).user.sub, id);
  }
}
