import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskPriority, TaskStatus } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(
    @Request() req: any,
    @Query('status') status?: TaskStatus,
    @Query('priority') priority?: TaskPriority,
    @Query('category') category?: string,
  ) {
    return this.tasksService.findAll((req as any).user.sub, { status, priority, category });
  }

  @Post()
  create(@Request() req: any, @Body() dto: CreateTaskDto) {
    return this.tasksService.create((req as any).user.sub, dto);
  }

  @Patch(':id')
  update(@Request() req: any, @Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksService.update((req as any).user.sub, id, dto);
  }

  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.tasksService.remove((req as any).user.sub, id);
  }

  @Post('generate-smart')
  generateSmartTasks(@Request() req: any) {
    return this.tasksService.generateSmartTasks((req as any).user.sub);
  }
}
