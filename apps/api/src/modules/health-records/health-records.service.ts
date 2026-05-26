import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  UpdateEmergencyDto,
  UpdateGettingOldDto,
  UpdateEndOfLifeDto,
} from './dto/health-records.dto';

@Injectable()
export class HealthRecordsService {
  constructor(private prisma: PrismaService) {}

  private async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async getEmergency(userId: string) {
    const profile = await this.getProfile(userId);

    const medicalRecords = await this.prisma.medicalRecord.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });

    const allergies = await this.prisma.allergy.findMany({
      where: { profileId: profile.id },
    });

    const bloodTypeRecord = medicalRecords.find((r) => r.bloodType);
    const conditions = medicalRecords.filter((r) => r.conditionName);

    return {
      bloodType: bloodTypeRecord?.bloodType ?? null,
      conditions,
      allergies,
    };
  }

  async updateEmergency(userId: string, dto: UpdateEmergencyDto) {
    const profile = await this.getProfile(userId);

    if (dto.bloodType !== undefined) {
      const existing = await this.prisma.medicalRecord.findFirst({
        where: { profileId: profile.id, bloodType: { not: null } },
      });
      if (existing) {
        await this.prisma.medicalRecord.update({
          where: { id: existing.id },
          data: { bloodType: dto.bloodType },
        });
      } else {
        await this.prisma.medicalRecord.create({
          data: { profileId: profile.id, bloodType: dto.bloodType },
        });
      }
    }

    if (dto.conditions && dto.conditions.length > 0) {
      await Promise.all(
        dto.conditions.map((c) =>
          this.prisma.medicalRecord.create({
            data: {
              profileId: profile.id,
              conditionName: c.name,
              status: c.status,
              notes: c.notes,
            },
          }),
        ),
      );
    }

    return this.getEmergency(userId);
  }

  async getGettingOld(userId: string) {
    const profile = await this.getProfile(userId);

    if (!profile.legacyNotes) return { gettingOld: {} };

    try {
      const parsed = JSON.parse(profile.legacyNotes);
      return { gettingOld: parsed.gettingOld ?? {} };
    } catch {
      return { gettingOld: {} };
    }
  }

  async updateGettingOld(userId: string, dto: UpdateGettingOldDto) {
    const profile = await this.getProfile(userId);

    let existing: Record<string, any> = {};
    if (profile.legacyNotes) {
      try {
        existing = JSON.parse(profile.legacyNotes);
      } catch {
        existing = {};
      }
    }

    const updated = { ...existing, gettingOld: dto };

    await this.prisma.profile.update({
      where: { id: profile.id },
      data: { legacyNotes: JSON.stringify(updated) },
    });

    return { gettingOld: dto };
  }

  async getEndOfLife(userId: string) {
    const profile = await this.getProfile(userId);

    let metadata: Record<string, any> = {};
    if (profile.legacyNotes) {
      try {
        const parsed = JSON.parse(profile.legacyNotes);
        metadata = parsed.endOfLife ?? {};
      } catch {
        metadata = {};
      }
    }

    return {
      burialLocation: profile.burialLocation,
      ...metadata,
    };
  }

  async updateEndOfLife(userId: string, dto: UpdateEndOfLifeDto) {
    const profile = await this.getProfile(userId);

    let existing: Record<string, any> = {};
    if (profile.legacyNotes) {
      try {
        existing = JSON.parse(profile.legacyNotes);
      } catch {
        existing = {};
      }
    }

    const { burialLocation, ...rest } = dto;
    const updated = { ...existing, endOfLife: rest };

    await this.prisma.profile.update({
      where: { id: profile.id },
      data: {
        burialLocation: burialLocation ?? profile.burialLocation,
        legacyNotes: JSON.stringify(updated),
      },
    });

    return this.getEndOfLife(userId);
  }
}
