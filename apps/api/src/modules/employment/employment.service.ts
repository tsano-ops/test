import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEmploymentDto, UpdateEmploymentDto } from './dto/employment.dto';

@Injectable()
export class EmploymentService {
  constructor(private prisma: PrismaService) {}

  private async getProfileId(userId: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile.id;
  }

  async findAll(userId: string) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.employment.findMany({
      where: { profileId },
      orderBy: [{ isCurrent: 'desc' }, { startDate: 'desc' }],
    });
  }

  async create(userId: string, dto: CreateEmploymentDto) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.employment.create({
      data: {
        profileId,
        employer: dto.employer,
        position: dto.position,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        isCurrent: dto.isCurrent ?? false,
        contactName: dto.contactName,
        contactEmail: dto.contactEmail,
        contactPhone: dto.contactPhone,
        notes: dto.notes,
      },
    });
  }

  async update(userId: string, id: string, dto: UpdateEmploymentDto) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.employment.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Employment record not found');
    return this.prisma.employment.update({
      where: { id },
      data: {
        employer: dto.employer,
        position: dto.position,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        isCurrent: dto.isCurrent,
        contactName: dto.contactName,
        contactEmail: dto.contactEmail,
        contactPhone: dto.contactPhone,
        notes: dto.notes,
      },
    });
  }

  async remove(userId: string, id: string) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.employment.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Employment record not found');
    await this.prisma.employment.delete({ where: { id } });
    return { success: true };
  }
}
