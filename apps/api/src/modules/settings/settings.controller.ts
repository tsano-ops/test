import {
  Controller,
  Get,
  Patch,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import {
  UpdateAccountDto,
  UpdatePasswordDto,
  UpdateNotificationsDto,
  UpdatePreferencesDto,
} from './dto/settings.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('account')
  getAccount(@Request() req: any) {
    return this.settingsService.getAccount((req as any).user.sub);
  }

  @Patch('account')
  updateAccount(@Request() req: any, @Body() dto: UpdateAccountDto) {
    return this.settingsService.updateAccount((req as any).user.sub, dto);
  }

  @Patch('password')
  updatePassword(@Request() req: any, @Body() dto: UpdatePasswordDto) {
    return this.settingsService.updatePassword((req as any).user.sub, dto);
  }

  @Get('notifications')
  getNotifications(@Request() req: any) {
    return this.settingsService.getNotifications((req as any).user.sub);
  }

  @Patch('notifications')
  updateNotifications(@Request() req: any, @Body() dto: UpdateNotificationsDto) {
    return this.settingsService.updateNotifications((req as any).user.sub, dto);
  }

  @Get('preferences')
  getPreferences(@Request() req: any) {
    return this.settingsService.getPreferences((req as any).user.sub);
  }

  @Patch('preferences')
  updatePreferences(@Request() req: any, @Body() dto: UpdatePreferencesDto) {
    return this.settingsService.updatePreferences((req as any).user.sub, dto);
  }

  @Get('audit-log')
  getAuditLog(@Request() req: any) {
    return this.settingsService.getAuditLog((req as any).user.sub);
  }
}
