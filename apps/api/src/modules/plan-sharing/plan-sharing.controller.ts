import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlanSharingService } from './plan-sharing.service';
import { InviteDto } from './dto/plan-sharing.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('plan-shares')
export class PlanSharingController {
  constructor(private readonly planSharingService: PlanSharingService) {}

  @Post('invite')
  invite(@Request() req: any, @Body() dto: InviteDto) {
    return this.planSharingService.invite((req as any).user.sub, dto);
  }

  @Get('received')
  getReceived(@Request() req: any) {
    return this.planSharingService.getReceived((req as any).user.sub);
  }

  @Get('sent')
  getSent(@Request() req: any) {
    return this.planSharingService.getSent((req as any).user.sub);
  }

  @Patch(':id/accept')
  accept(@Request() req: any, @Param('id') id: string) {
    return this.planSharingService.accept((req as any).user.sub, id);
  }

  @Patch(':id/revoke')
  revoke(@Request() req: any, @Param('id') id: string) {
    return this.planSharingService.revoke((req as any).user.sub, id);
  }

  @Get(':id/permissions')
  getPermissions(@Request() req: any, @Param('id') id: string) {
    return this.planSharingService.getPermissions((req as any).user.sub, id);
  }
}
