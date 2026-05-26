import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { MemorialService } from './memorial.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateMemorialDto } from './dto/memorial.dto';

@UseGuards(JwtAuthGuard)
@Controller('memorial')
export class MemorialController {
  constructor(private readonly memorialService: MemorialService) {}

  @Get()
  getMemorial(@Request() req: any) {
    return this.memorialService.getMemorial((req as any).user.sub);
  }

  @Patch()
  updateMemorial(@Request() req: any, @Body() dto: UpdateMemorialDto) {
    return this.memorialService.updateMemorial((req as any).user.sub, dto);
  }
}
