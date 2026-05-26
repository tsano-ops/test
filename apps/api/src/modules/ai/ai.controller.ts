import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateMessageDto } from './dto/ai.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('history')
  getHistory(@Request() req: any) {
    return this.aiService.getHistory((req as any).user.sub);
  }

  @Post('message')
  sendMessage(@Request() req: any, @Body() dto: CreateMessageDto) {
    return this.aiService.sendMessage((req as any).user.sub, dto.message);
  }

  @Delete('history')
  clearHistory(@Request() req: any) {
    return this.aiService.clearHistory((req as any).user.sub);
  }
}
