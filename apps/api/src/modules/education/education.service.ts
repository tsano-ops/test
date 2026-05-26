import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateEducationDto, UpdateEducationDto } from './dto/education.dto';

@Injectable()
export class EducationService {
  constructor(private prisma: PrismaService) {}

  private async getProfileId(userId: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile.id;
  }

  async findAll(userId: string) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.education.findMany({ where: { profileId }, orderBy: { yearCompleted: 'desc' } });
  }

  async create(userId: string, dto: CreateEducationDto) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.education.create({ data: { profileId, ...dto } });
  }

  async update(userId: string, id: string, dto: UpdateEducationDto) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.education.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Education record not found');
    return this.prisma.education.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.education.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Education record not found');
    await this.prisma.education.delete({ where: { id } });
    return { success: true };
  }
}
