import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFamilyMemberDto, UpdateFamilyMemberDto } from './dto/family.dto';

@Injectable()
export class FamilyService {
  constructor(private prisma: PrismaService) {}

  private async getOwnerProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async findAll(userId: string) {
    const owner = await this.getOwnerProfile(userId);

    const relationships = await this.prisma.relationship.findMany({
      where: {
        OR: [
          { fromProfileId: owner.id },
          { toProfileId: owner.id },
        ],
      },
      include: {
        fromProfile: {
          include: { contacts: true, relationshipsFrom: true, relationshipsTo: true },
        },
        toProfile: {
          include: { contacts: true, relationshipsFrom: true, relationshipsTo: true },
        },
      },
    });

    const memberIds = new Set<string>();
    const members: any[] = [];

    for (const rel of relationships) {
      const member =
        rel.fromProfileId === owner.id ? rel.toProfile : rel.fromProfile;
      if (!member.isPlanOwner && !memberIds.has(member.id)) {
        memberIds.add(member.id);
        members.push(member);
      }
    }

    return members;
  }

  async findOne(userId: string, memberId: string) {
    const owner = await this.getOwnerProfile(userId);

    const relationship = await this.prisma.relationship.findFirst({
      where: {
        OR: [
          { fromProfileId: owner.id, toProfileId: memberId },
          { fromProfileId: memberId, toProfileId: owner.id },
        ],
      },
    });

    if (!relationship) throw new NotFoundException('Family member not found');

    const member = await this.prisma.profile.findUnique({
      where: { id: memberId },
      include: { contacts: true, relationshipsFrom: true, relationshipsTo: true },
    });

    if (!member || member.isPlanOwner) throw new NotFoundException('Family member not found');

    return member;
  }

  async create(userId: string, dto: CreateFamilyMemberDto) {
    const owner = await this.getOwnerProfile(userId);

    const member = await this.prisma.profile.create({
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        maritalStatus: dto.maritalStatus,
        nationality: dto.nationality,
        countryOfResidence: dto.countryOfResidence,
        isDeceased: dto.isDeceased ?? false,
        dateOfDeath: dto.dateOfDeath ? new Date(dto.dateOfDeath) : undefined,
        causeOfDeath: dto.causeOfDeath,
        legacyNotes: dto.legacyNotes,
        photoUrl: dto.photoUrl,
        isPlanOwner: false,
        userId: null,
      },
    });

    await this.prisma.relationship.create({
      data: {
        fromProfileId: owner.id,
        toProfileId: member.id,
        type: 'OTHER',
      },
    });

    return member;
  }

  async update(userId: string, memberId: string, dto: UpdateFamilyMemberDto) {
    const owner = await this.getOwnerProfile(userId);

    const relationship = await this.prisma.relationship.findFirst({
      where: {
        OR: [
          { fromProfileId: owner.id, toProfileId: memberId },
          { fromProfileId: memberId, toProfileId: owner.id },
        ],
      },
    });

    if (!relationship) throw new NotFoundException('Family member not found');

    return this.prisma.profile.update({
      where: { id: memberId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        maritalStatus: dto.maritalStatus,
        nationality: dto.nationality,
        countryOfResidence: dto.countryOfResidence,
        isDeceased: dto.isDeceased,
        dateOfDeath: dto.dateOfDeath ? new Date(dto.dateOfDeath) : undefined,
        causeOfDeath: dto.causeOfDeath,
        legacyNotes: dto.legacyNotes,
        photoUrl: dto.photoUrl,
      },
    });
  }

  async remove(userId: string, memberId: string) {
    const owner = await this.getOwnerProfile(userId);

    const relationship = await this.prisma.relationship.findFirst({
      where: {
        OR: [
          { fromProfileId: owner.id, toProfileId: memberId },
          { fromProfileId: memberId, toProfileId: owner.id },
        ],
      },
    });

    if (!relationship) throw new NotFoundException('Family member not found');

    await this.prisma.profile.delete({ where: { id: memberId } });
    return { success: true };
  }
}
