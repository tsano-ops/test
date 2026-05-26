import { Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class InvitationsService {
  constructor(private prisma: PrismaService) {}

  async createInvitation(senderId: string, dto: { email: string; role: string; message?: string }) {
    // Validate sender is a PlanOwner
    const senderProfile = await this.prisma.profile.findFirst({
      where: { userId: senderId, isPlanOwner: true },
    });
    if (!senderProfile) {
      throw new BadRequestException('Only PlanOwners can send invitations.');
    }

    // Check if already invited
    const existing = await this.prisma.invitation.findFirst({
      where: {
        senderId,
        recipientEmail: dto.email.toLowerCase(),
        status: 'PENDING',
      },
    });
    if (existing) {
      throw new BadRequestException('An invitation is already pending for this email.');
    }

    // Generate unique token
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const invitation = await this.prisma.invitation.create({
      data: {
        senderId,
        recipientEmail: dto.email.toLowerCase(),
        role: dto.role as any,
        token,
        message: dto.message,
        expiresAt,
      },
      include: {
        sender: {
          select: { email: true, profile: { select: { firstName: true, lastName: true } } },
        },
      },
    });

    // Log invitation token (dev mode — replace with email sending in production)
    const senderName = invitation.sender.profile
      ? `${invitation.sender.profile.firstName} ${invitation.sender.profile.lastName}`
      : invitation.sender.email;
    console.log(`[DEV] Invitation from ${senderName} to ${dto.email}`);
    console.log(`[DEV] Role: ${dto.role}`);
    console.log(`[DEV] Token: ${token}`);
    console.log(`[DEV] Register URL: /register/invite/${token}`);

    return {
      id: invitation.id,
      recipientEmail: invitation.recipientEmail,
      role: invitation.role,
      token: invitation.token,
      expiresAt: invitation.expiresAt,
      senderName,
    };
  }

  async getInvitationByToken(token: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { token },
      include: {
        sender: {
          select: { email: true, profile: { select: { firstName: true, lastName: true } } },
        },
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    if (invitation.status === 'ACCEPTED') {
      throw new BadRequestException('This invitation has already been accepted.');
    }

    if (invitation.status === 'REVOKED') {
      throw new BadRequestException('This invitation has been revoked.');
    }

    if (invitation.status === 'EXPIRED' || invitation.expiresAt < new Date()) {
      // Mark as expired if not already
      if (invitation.status !== 'EXPIRED') {
        await this.prisma.invitation.update({
          where: { id: invitation.id },
          data: { status: 'EXPIRED' },
        });
      }
      throw new BadRequestException('This invitation has expired. Please ask the sender to resend.');
    }

    const senderName = invitation.sender.profile
      ? `${invitation.sender.profile.firstName} ${invitation.sender.profile.lastName}`
      : invitation.sender.email;

    return {
      id: invitation.id,
      role: invitation.role,
      senderName,
      senderEmail: invitation.sender.email,
      message: invitation.message,
      recipientEmail: invitation.recipientEmail,
    };
  }

  async acceptInvitation(token: string, recipientUserId: string) {
    const invitation = await this.prisma.invitation.findUnique({
      where: { token },
    });

    if (!invitation || invitation.status !== 'PENDING') {
      throw new BadRequestException('Invalid or already used invitation.');
    }

    if (invitation.expiresAt < new Date()) {
      await this.prisma.invitation.update({
        where: { id: invitation.id },
        data: { status: 'EXPIRED' },
      });
      throw new BadRequestException('This invitation has expired.');
    }

    // Update invitation
    await this.prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        status: 'ACCEPTED',
        acceptedAt: new Date(),
        recipientId: recipientUserId,
      },
    });

    // Create PlanShare linking the invited user to the PlanOwner
    const existingShare = await this.prisma.planShare.findFirst({
      where: {
        ownerId: invitation.senderId,
        sharedWithId: recipientUserId,
      },
    });

    if (!existingShare) {
      await this.prisma.planShare.create({
        data: {
          ownerId: invitation.senderId,
          sharedWithId: recipientUserId,
          role: invitation.role,
          acceptedAt: new Date(),
        },
      });
    }

    // Update the new user's account type
    await this.prisma.user.update({
      where: { id: recipientUserId },
      data: { accountType: 'INVITED_USER' as any },
    });

    return { success: true, role: invitation.role };
  }

  async getSentInvitations(senderId: string) {
    return this.prisma.invitation.findMany({
      where: { senderId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        recipientEmail: true,
        role: true,
        status: true,
        expiresAt: true,
        acceptedAt: true,
        createdAt: true,
      },
    });
  }

  async revokeInvitation(senderId: string, invitationId: string) {
    const invitation = await this.prisma.invitation.findFirst({
      where: { id: invitationId, senderId, status: 'PENDING' },
    });

    if (!invitation) {
      throw new NotFoundException('Pending invitation not found.');
    }

    await this.prisma.invitation.update({
      where: { id: invitationId },
      data: { status: 'REVOKED' },
    });

    return { success: true };
  }

  async resendInvitation(senderId: string, invitationId: string) {
    const invitation = await this.prisma.invitation.findFirst({
      where: { id: invitationId, senderId },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found.');
    }

    // Generate new token and extend expiry
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const updated = await this.prisma.invitation.update({
      where: { id: invitationId },
      data: { token, expiresAt, status: 'PENDING' },
    });

    console.log(`[DEV] Resent invitation to ${invitation.recipientEmail}`);
    console.log(`[DEV] New token: ${token}`);
    console.log(`[DEV] Register URL: /register/invite/${token}`);

    return {
      id: updated.id,
      token: updated.token,
      expiresAt: updated.expiresAt,
    };
  }
}
