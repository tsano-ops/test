import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { HealthRecordsService } from './health-records.service';
import {
  UpdateEmergencyDto,
  UpdateGettingOldDto,
  UpdateEndOfLifeDto,
} from './dto/health-records.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('health')
export class HealthRecordsController {
  constructor(private healthRecordsService: HealthRecordsService) {}

  @Get('emergency')
  getEmergency(@Req() req: Request) {
    return this.healthRecordsService.getEmergency((req as any).user.sub);
  }

  @Patch('emergency')
  updateEmergency(@Req() req: Request, @Body() dto: UpdateEmergencyDto) {
    return this.healthRecordsService.updateEmergency((req as any).user.sub, dto);
  }

  @Get('getting-old')
  getGettingOld(@Req() req: Request) {
    return this.healthRecordsService.getGettingOld((req as any).user.sub);
  }

  @Patch('getting-old')
  updateGettingOld(@Req() req: Request, @Body() dto: UpdateGettingOldDto) {
    return this.healthRecordsService.updateGettingOld((req as any).user.sub, dto);
  }

  @Get('end-of-life')
  getEndOfLife(@Req() req: Request) {
    return this.healthRecordsService.getEndOfLife((req as any).user.sub);
  }

  @Patch('end-of-life')
  updateEndOfLife(@Req() req: Request, @Body() dto: UpdateEndOfLifeDto) {
    return this.healthRecordsService.updateEndOfLife((req as any).user.sub, dto);
  }
}
