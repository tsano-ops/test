import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import {
  UpdateAccountDto,
  UpdatePasswordDto,
  UpdateNotificationsDto,
  UpdatePreferencesDto,
} from './dto/settings.dto';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async getAccount(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });
    if (!user) throw new NotFoundException('User not found');

    const { passwordHash, verificationCode, twoFactorSecret, ...safeUser } = user;
    return safeUser;
  }

  async updateAccount(userId: string, dto: UpdateAccountDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');

    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: {
        ...(dto.firstName !== undefined && { firstName: dto.firstName }),
        ...(dto.lastName !== undefined && { lastName: dto.lastName }),
      },
    });

    return updatedProfile;
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect');

    const newHash = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    return { success: true };
  }

  async getNotifications(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const data = (user.onboardingData as any) ?? {};
    return {
      emailNotifications: data?.notifications?.emailNotifications ?? true,
      taskReminders: data?.notifications?.taskReminders ?? true,
      planUpdates: data?.notifications?.planUpdates ?? true,
    };
  }

  async updateNotifications(userId: string, dto: UpdateNotificationsDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const existing = (user.onboardingData as any) ?? {};
    const updated = {
      ...existing,
      notifications: {
        ...(existing.notifications ?? {}),
        ...(dto.emailNotifications !== undefined && { emailNotifications: dto.emailNotifications }),
        ...(dto.taskReminders !== undefined && { taskReminders: dto.taskReminders }),
        ...(dto.planUpdates !== undefined && { planUpdates: dto.planUpdates }),
      },
    };

    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingData: updated },
    });

    return updated.notifications;
  }

  async getPreferences(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const data = (user.onboardingData as any) ?? {};
    return {
      language: data?.preferences?.language ?? 'en',
      timezone: data?.preferences?.timezone ?? 'UTC',
    };
  }

  async updatePreferences(userId: string, dto: UpdatePreferencesDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const existing = (user.onboardingData as any) ?? {};
    const updated = {
      ...existing,
      preferences: {
        ...(existing.preferences ?? {}),
        ...(dto.language !== undefined && { language: dto.language }),
        ...(dto.timezone !== undefined && { timezone: dto.timezone }),
      },
    };

    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingData: updated },
    });

    return updated.preferences;
  }

  async getAuditLog(userId: string) {
    return this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
