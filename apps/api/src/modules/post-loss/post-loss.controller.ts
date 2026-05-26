import { Controller, Get, Post, Param, Request, UseGuards } from '@nestjs/common';
import { PostLossService } from './post-loss.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('post-loss')
export class PostLossController {
  constructor(private readonly postLossService: PostLossService) {}

  @Get('checklist')
  getChecklist(@Request() req: any) {
    return this.postLossService.getChecklist((req as any).user.sub);
  }

  @Post('checklist/:stepId/complete')
  completeStep(@Request() req: any, @Param('stepId') stepId: string) {
    return this.postLossService.completeStep((req as any).user.sub, stepId);
  }

  @Get('resources')
  getResources() {
    return this.postLossService.getResources();
  }
}
