import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  UpdateEssentialDto,
  CreateContactDto,
  UpdateContactDto,
  CreateMedicalRecordDto,
  UpdateMedicalRecordDto,
  CreateAllergyDto,
  UpdateAllergyDto,
  CreateBeliefDto,
  UpdateBeliefDto,
} from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // ─── Essential Info ───────────────────────────────────────

  async getFullProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        contacts: true,
        medicalRecords: true,
        allergies: true,
        educations: true,
        employments: true,
        beliefs: true,
      },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateEssential(userId: string, dto: UpdateEssentialDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.profile.update({
      where: { userId },
      data: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        dateOfBirth: dto.dateOfBirth ? new Date(dto.dateOfBirth) : undefined,
        gender: dto.gender,
        maritalStatus: dto.maritalStatus,
        nationality: dto.nationality,
        countryOfResidence: dto.countryOfResidence,
        stateRegion: dto.stateRegion,
        photoUrl: dto.photoUrl,
      },
    });
  }

  // ─── Contact Info ─────────────────────────────────────────

  async getContacts(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.contactInfo.findMany({ where: { profileId: profile.id } });
  }

  async createContact(userId: string, dto: CreateContactDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.contactInfo.create({ data: { profileId: profile.id, ...dto } });
  }

  async updateContact(userId: string, contactId: string, dto: UpdateContactDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const contact = await this.prisma.contactInfo.findFirst({
      where: { id: contactId, profileId: profile.id },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    return this.prisma.contactInfo.update({ where: { id: contactId }, data: dto });
  }

  async deleteContact(userId: string, contactId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const contact = await this.prisma.contactInfo.findFirst({
      where: { id: contactId, profileId: profile.id },
    });
    if (!contact) throw new NotFoundException('Contact not found');
    await this.prisma.contactInfo.delete({ where: { id: contactId } });
    return { success: true };
  }

  // ─── Medical Records ──────────────────────────────────────

  async getMedicalRecords(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.medicalRecord.findMany({ where: { profileId: profile.id } });
  }

  async createMedicalRecord(userId: string, dto: CreateMedicalRecordDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.medicalRecord.create({
      data: {
        profileId: profile.id,
        bloodType: dto.bloodType,
        conditionName: dto.conditionName,
        diagnosedDate: dto.diagnosedDate ? new Date(dto.diagnosedDate) : undefined,
        status: dto.status,
        notes: dto.notes,
      },
    });
  }

  async updateMedicalRecord(userId: string, recordId: string, dto: UpdateMedicalRecordDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const record = await this.prisma.medicalRecord.findFirst({
      where: { id: recordId, profileId: profile.id },
    });
    if (!record) throw new NotFoundException('Medical record not found');
    return this.prisma.medicalRecord.update({
      where: { id: recordId },
      data: {
        bloodType: dto.bloodType,
        conditionName: dto.conditionName,
        diagnosedDate: dto.diagnosedDate ? new Date(dto.diagnosedDate) : undefined,
        status: dto.status,
        notes: dto.notes,
      },
    });
  }

  async deleteMedicalRecord(userId: string, recordId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const record = await this.prisma.medicalRecord.findFirst({
      where: { id: recordId, profileId: profile.id },
    });
    if (!record) throw new NotFoundException('Medical record not found');
    await this.prisma.medicalRecord.delete({ where: { id: recordId } });
    return { success: true };
  }

  // ─── Allergies ────────────────────────────────────────────

  async getAllergies(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.allergy.findMany({ where: { profileId: profile.id } });
  }

  async createAllergy(userId: string, dto: CreateAllergyDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.allergy.create({ data: { profileId: profile.id, ...dto } });
  }

  async updateAllergy(userId: string, allergyId: string, dto: UpdateAllergyDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const allergy = await this.prisma.allergy.findFirst({
      where: { id: allergyId, profileId: profile.id },
    });
    if (!allergy) throw new NotFoundException('Allergy not found');
    return this.prisma.allergy.update({ where: { id: allergyId }, data: dto });
  }

  async deleteAllergy(userId: string, allergyId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const allergy = await this.prisma.allergy.findFirst({
      where: { id: allergyId, profileId: profile.id },
    });
    if (!allergy) throw new NotFoundException('Allergy not found');
    await this.prisma.allergy.delete({ where: { id: allergyId } });
    return { success: true };
  }

  // ─── Beliefs ──────────────────────────────────────────────

  async getBeliefs(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.belief.findMany({ where: { profileId: profile.id } });
  }

  async createBelief(userId: string, dto: CreateBeliefDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return this.prisma.belief.create({ data: { profileId: profile.id, ...dto } });
  }

  async updateBelief(userId: string, beliefId: string, dto: UpdateBeliefDto) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const belief = await this.prisma.belief.findFirst({
      where: { id: beliefId, profileId: profile.id },
    });
    if (!belief) throw new NotFoundException('Belief not found');
    return this.prisma.belief.update({ where: { id: beliefId }, data: dto });
  }

  async deleteBelief(userId: string, beliefId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    const belief = await this.prisma.belief.findFirst({
      where: { id: beliefId, profileId: profile.id },
    });
    if (!belief) throw new NotFoundException('Belief not found');
    await this.prisma.belief.delete({ where: { id: beliefId } });
    return { success: true };
  }
}
