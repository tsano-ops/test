import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateMemorialDto } from './dto/memorial.dto';

export interface MemorialData {
  fullName: string;
  dateOfBirth: string;
  dateOfPassing: string;
  photoUrl: string;
  biography: string;
  tributeMessage: string;
  isPublished: boolean;
}

const DEFAULT_MEMORIAL: MemorialData = {
  fullName: '',
  dateOfBirth: '',
  dateOfPassing: '',
  photoUrl: '',
  biography: '',
  tributeMessage: '',
  isPublished: false,
};

@Injectable()
export class MemorialService {
  constructor(private readonly prisma: PrismaService) {}

  async getMemorial(userId: string): Promise<MemorialData> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      select: { legacyNotes: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    if (!profile.legacyNotes) {
      return { ...DEFAULT_MEMORIAL };
    }

    try {
      const parsed = JSON.parse(profile.legacyNotes);
      return { ...DEFAULT_MEMORIAL, ...(parsed.memorial || {}) };
    } catch {
      return { ...DEFAULT_MEMORIAL };
    }
  }

  async updateMemorial(
    userId: string,
    dto: UpdateMemorialDto,
  ): Promise<MemorialData> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      select: { legacyNotes: true },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    let existing: Record<string, unknown> = {};
    if (profile.legacyNotes) {
      try {
        existing = JSON.parse(profile.legacyNotes);
      } catch {
        existing = {};
      }
    }

    const currentMemorial = existing.memorial || {};
    const updatedMemorial = { ...DEFAULT_MEMORIAL, ...currentMemorial, ...dto };

    existing.memorial = updatedMemorial;

    await this.prisma.profile.update({
      where: { userId },
      data: { legacyNotes: JSON.stringify(existing) },
    });

    return updatedMemorial;
  }
}
