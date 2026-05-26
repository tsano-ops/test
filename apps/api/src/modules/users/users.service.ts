import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDto } from './dto/profile.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async upsertProfile(userId: string, dto: CreateProfileDto) {
    const profile = await this.prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        placeOfBirth: dto.placeOfBirth,
        citizenships: dto.citizenships,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        maritalStatus: dto.maritalStatus,
        nationality: dto.nationality,
        countryOfResidence: dto.countryOfResidence,
        stateRegion: dto.stateRegion,
        photoUrl: dto.photoUrl,
        isPlanOwner: true,
      },
      update: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        middleName: dto.middleName,
        placeOfBirth: dto.placeOfBirth,
        citizenships: dto.citizenships,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        maritalStatus: dto.maritalStatus,
        nationality: dto.nationality,
        countryOfResidence: dto.countryOfResidence,
        stateRegion: dto.stateRegion,
        photoUrl: dto.photoUrl,
      },
    });

    // Mark onboarding as complete
    await this.prisma.user.update({
      where: { id: userId },
      data: { onboardingCompleted: true },
    });

    return profile;
  }

  async getProfile(userId: string) {
    return this.prisma.profile.findUnique({ where: { userId } });
  }
}
