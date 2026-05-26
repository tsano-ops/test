import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EncryptionService } from '../../common/encryption.service';
import { CreateCredentialDto, UpdateCredentialDto } from './dto/credential.dto';

@Injectable()
export class CredentialsService {
  constructor(
    private prisma: PrismaService,
    private encryption: EncryptionService,
  ) {}

  private async getProfileId(userId: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile.id;
  }

  private async verifyAssetOwnership(userId: string, assetId: string): Promise<void> {
    const profileId = await this.getProfileId(userId);
    const asset = await this.prisma.asset.findFirst({ where: { id: assetId, profileId } });
    if (!asset) throw new ForbiddenException('Asset not found or access denied');
  }

  private decryptCredential<T extends { encryptedPassword?: string | null; encryptedNotes?: string | null }>(credential: T): T {
    return {
      ...credential,
      encryptedPassword: credential.encryptedPassword
        ? this.encryption.decrypt(credential.encryptedPassword)
        : credential.encryptedPassword,
      encryptedNotes: credential.encryptedNotes
        ? this.encryption.decrypt(credential.encryptedNotes)
        : credential.encryptedNotes,
    };
  }

  async findByAsset(userId: string, assetId: string) {
    await this.verifyAssetOwnership(userId, assetId);
    const credentials = await this.prisma.credential.findMany({
      where: { assetId },
      orderBy: { createdAt: 'desc' },
    });
    return credentials.map((c) => this.decryptCredential(c));
  }

  async create(userId: string, dto: CreateCredentialDto) {
    await this.verifyAssetOwnership(userId, dto.assetId);
    const { assetId, ...rest } = dto;

    const data = {
      ...rest,
      assetId,
      encryptedPassword: rest.encryptedPassword
        ? this.encryption.encrypt(rest.encryptedPassword)
        : rest.encryptedPassword,
      encryptedNotes: rest.encryptedNotes
        ? this.encryption.encrypt(rest.encryptedNotes)
        : rest.encryptedNotes,
    };

    return this.prisma.credential.create({ data });
  }

  async update(userId: string, id: string, dto: UpdateCredentialDto) {
    const credential = await this.prisma.credential.findUnique({
      where: { id },
      include: { asset: true },
    });
    if (!credential) throw new NotFoundException('Credential not found');
    await this.verifyAssetOwnership(userId, credential.assetId);
    const { assetId, ...rest } = dto;

    const data = {
      ...rest,
      encryptedPassword: rest.encryptedPassword !== undefined
        ? (rest.encryptedPassword ? this.encryption.encrypt(rest.encryptedPassword) : rest.encryptedPassword)
        : undefined,
      encryptedNotes: rest.encryptedNotes !== undefined
        ? (rest.encryptedNotes ? this.encryption.encrypt(rest.encryptedNotes) : rest.encryptedNotes)
        : undefined,
    };

    return this.prisma.credential.update({ where: { id }, data });
  }

  async remove(userId: string, id: string) {
    const credential = await this.prisma.credential.findUnique({
      where: { id },
      include: { asset: true },
    });
    if (!credential) throw new NotFoundException('Credential not found');
    await this.verifyAssetOwnership(userId, credential.assetId);
    await this.prisma.credential.delete({ where: { id } });
    return { success: true };
  }
}
