import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLiabilityDto, UpdateLiabilityDto } from './dto/liability.dto';

@Injectable()
export class LiabilitiesService {
  constructor(private prisma: PrismaService) {}

  private async getProfileId(userId: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile.id;
  }

  async findAll(userId: string) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.liability.findMany({
      where: { profileId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateLiabilityDto) {
    const profileId = await this.getProfileId(userId);
    const { dueDate, ...rest } = dto;
    return this.prisma.liability.create({
      data: {
        profileId,
        ...rest,
        ...(dueDate ? { dueDate: new Date(dueDate) } : {}),
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateLiabilityDto) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.liability.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Liability not found');
    const { dueDate, ...rest } = dto;
    return this.prisma.liability.update({
      where: { id },
      data: {
        ...rest,
        ...(dueDate !== undefined ? { dueDate: dueDate ? new Date(dueDate) : null } : {}),
      },
    });
  }

  async remove(userId: string, id: string) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.liability.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Liability not found');
    await this.prisma.liability.delete({ where: { id } });
    return { success: true };
  }
}
