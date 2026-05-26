import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EncryptionService } from '../../common/encryption.service';
import { CreateLetterDto, UpdateLetterDto } from './dto/letter.dto';

@Injectable()
export class LettersService {
  constructor(
    private prisma: PrismaService,
    private encryption: EncryptionService,
  ) {}

  private async getOwnerProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  private decryptLetter<T extends { encryptedContent: string }>(letter: T): T & { content: string } {
    return {
      ...letter,
      content: this.encryption.decrypt(letter.encryptedContent),
    };
  }

  async findAll(userId: string) {
    const profile = await this.getOwnerProfile(userId);
    const letters = await this.prisma.letter.findMany({
      where: { authorProfileId: profile.id },
      include: { recipient: true },
      orderBy: { createdAt: 'desc' },
    });
    return letters.map((l) => this.decryptLetter(l));
  }

  async findOne(userId: string, id: string) {
    const profile = await this.getOwnerProfile(userId);

    const letter = await this.prisma.letter.findFirst({
      where: { id, authorProfileId: profile.id },
      include: { recipient: true },
    });
    if (!letter) throw new NotFoundException('Letter not found');

    return this.decryptLetter(letter);
  }

  async create(userId: string, dto: CreateLetterDto) {
    const profile = await this.getOwnerProfile(userId);

    return this.prisma.letter.create({
      data: {
        authorProfileId: profile.id,
        recipientProfileId: dto.recipientProfileId,
        title: dto.title,
        encryptedContent: this.encryption.encrypt(dto.content),
        deliveryTrigger: dto.deliveryTrigger,
        triggerDate: dto.triggerDate ? new Date(dto.triggerDate) : undefined,
      },
      include: { recipient: true },
    });
  }

  async update(userId: string, id: string, dto: UpdateLetterDto) {
    const profile = await this.getOwnerProfile(userId);

    const letter = await this.prisma.letter.findFirst({
      where: { id, authorProfileId: profile.id },
    });
    if (!letter) throw new NotFoundException('Letter not found');

    return this.prisma.letter.update({
      where: { id },
      data: {
        title: dto.title,
        encryptedContent: dto.content
          ? this.encryption.encrypt(dto.content)
          : undefined,
        deliveryTrigger: dto.deliveryTrigger,
        triggerDate: dto.triggerDate ? new Date(dto.triggerDate) : undefined,
      },
      include: { recipient: true },
    });
  }

  async remove(userId: string, id: string) {
    const profile = await this.getOwnerProfile(userId);

    const letter = await this.prisma.letter.findFirst({
      where: { id, authorProfileId: profile.id },
    });
    if (!letter) throw new NotFoundException('Letter not found');

    await this.prisma.letter.delete({ where: { id } });
    return { success: true };
  }
}
