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
import { GoalsService } from './goals.service';
import { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('goals')
export class GoalsController {
  constructor(private goalsService: GoalsService) {}

  @Get()
  findAll(@Req() req: Request, @Query('type') type?: string) {
    return this.goalsService.findAll((req as any).user.sub, type);
  }

  @Post()
  create(@Req() req: Request, @Body() dto: CreateGoalDto) {
    return this.goalsService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateGoalDto,
  ) {
    return this.goalsService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.goalsService.remove((req as any).user.sub, id);
  }
}
