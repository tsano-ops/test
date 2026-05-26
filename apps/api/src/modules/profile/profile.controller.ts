import {
  Controller, Get, Patch, Post, Delete,
  Body, Param, UseGuards, Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // ─── Full Profile ─────────────────────────────────────────

  @Get()
  getFullProfile(@Req() req: Request) {
    return this.profileService.getFullProfile((req as any).user.sub);
  }

  @Patch()
  updateEssential(@Req() req: Request, @Body() dto: UpdateEssentialDto) {
    return this.profileService.updateEssential((req as any).user.sub, dto);
  }

  // ─── Contacts ─────────────────────────────────────────────

  @Get('contacts')
  getContacts(@Req() req: Request) {
    return this.profileService.getContacts((req as any).user.sub);
  }

  @Post('contacts')
  createContact(@Req() req: Request, @Body() dto: CreateContactDto) {
    return this.profileService.createContact((req as any).user.sub, dto);
  }

  @Patch('contacts/:id')
  updateContact(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.profileService.updateContact((req as any).user.sub, id, dto);
  }

  @Delete('contacts/:id')
  deleteContact(@Req() req: Request, @Param('id') id: string) {
    return this.profileService.deleteContact((req as any).user.sub, id);
  }

  // ─── Medical Records ──────────────────────────────────────

  @Get('medical')
  getMedicalRecords(@Req() req: Request) {
    return this.profileService.getMedicalRecords((req as any).user.sub);
  }

  @Post('medical')
  createMedicalRecord(@Req() req: Request, @Body() dto: CreateMedicalRecordDto) {
    return this.profileService.createMedicalRecord((req as any).user.sub, dto);
  }

  @Patch('medical/:id')
  updateMedicalRecord(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateMedicalRecordDto) {
    return this.profileService.updateMedicalRecord((req as any).user.sub, id, dto);
  }

  @Delete('medical/:id')
  deleteMedicalRecord(@Req() req: Request, @Param('id') id: string) {
    return this.profileService.deleteMedicalRecord((req as any).user.sub, id);
  }

  // ─── Allergies ────────────────────────────────────────────

  @Get('allergies')
  getAllergies(@Req() req: Request) {
    return this.profileService.getAllergies((req as any).user.sub);
  }

  @Post('allergies')
  createAllergy(@Req() req: Request, @Body() dto: CreateAllergyDto) {
    return this.profileService.createAllergy((req as any).user.sub, dto);
  }

  @Patch('allergies/:id')
  updateAllergy(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateAllergyDto) {
    return this.profileService.updateAllergy((req as any).user.sub, id, dto);
  }

  @Delete('allergies/:id')
  deleteAllergy(@Req() req: Request, @Param('id') id: string) {
    return this.profileService.deleteAllergy((req as any).user.sub, id);
  }

  // ─── Beliefs ──────────────────────────────────────────────

  @Get('beliefs')
  getBeliefs(@Req() req: Request) {
    return this.profileService.getBeliefs((req as any).user.sub);
  }

  @Post('beliefs')
  createBelief(@Req() req: Request, @Body() dto: CreateBeliefDto) {
    return this.profileService.createBelief((req as any).user.sub, dto);
  }

  @Patch('beliefs/:id')
  updateBelief(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateBeliefDto) {
    return this.profileService.updateBelief((req as any).user.sub, id, dto);
  }

  @Delete('beliefs/:id')
  deleteBelief(@Req() req: Request, @Param('id') id: string) {
    return this.profileService.deleteBelief((req as any).user.sub, id);
  }
}
