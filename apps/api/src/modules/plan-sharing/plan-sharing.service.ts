import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { InviteDto, UpdateShareDto } from './dto/plan-sharing.dto';

@Injectable()
export class PlanSharingService {
  constructor(private prisma: PrismaService) {}

  async invite(ownerId: string, dto: InviteDto) {
    const targetUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!targetUser) throw new NotFoundException('User with that email not found');

    const existing = await this.prisma.planShare.findUnique({
      where: { ownerId_sharedWithId: { ownerId, sharedWithId: targetUser.id } },
    });
    if (existing) throw new ConflictException('Share already exists for this user');

    return this.prisma.planShare.create({
      data: {
        ownerId,
        sharedWithId: targetUser.id,
        role: dto.role,
        acceptedAt: null,
      },
    });
  }

  async getReceived(userId: string) {
    return this.prisma.planShare.findMany({
      where: { sharedWithId: userId },
      include: {
        owner: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getSent(userId: string) {
    return this.prisma.planShare.findMany({
      where: { ownerId: userId },
      include: {
        sharedWith: {
          include: { profile: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async accept(userId: string, shareId: string) {
    const share = await this.prisma.planShare.findFirst({
      where: { id: shareId, sharedWithId: userId },
    });
    if (!share) throw new NotFoundException('Share not found');

    return this.prisma.planShare.update({
      where: { id: shareId },
      data: { acceptedAt: new Date() },
    });
  }

  async revoke(ownerId: string, shareId: string) {
    const share = await this.prisma.planShare.findFirst({
      where: { id: shareId, ownerId },
    });
    if (!share) throw new NotFoundException('Share not found');

    return this.prisma.planShare.update({
      where: { id: shareId },
      data: { revokedAt: new Date() },
    });
  }

  async getPermissions(userId: string, shareId: string) {
    const share = await this.prisma.planShare.findFirst({
      where: {
        id: shareId,
        OR: [{ ownerId: userId }, { sharedWithId: userId }],
      },
    });
    if (!share) throw new NotFoundException('Share not found');

    return { role: share.role, permissions: share.permissions };
  }
}
