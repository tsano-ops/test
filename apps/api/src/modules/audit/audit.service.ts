import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface AuditEntry {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  changes?: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
}

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(entry: AuditEntry): Promise<void> {
    await this.prisma.auditLog.create({
      data: {
        userId: entry.userId,
        action: entry.action,
        entityType: entry.entityType,
        entityId: entry.entityId,
        changes: entry.changes as any,
        ipAddress: entry.ipAddress,
        userAgent: entry.userAgent,
      },
    });
  }

  async logAccountCreated(userId: string, accountType: string, ip?: string) {
    await this.log({
      userId,
      action: 'ACCOUNT_CREATED',
      entityType: 'User',
      entityId: userId,
      changes: { accountType },
      ipAddress: ip,
    });
  }

  async logAccountTypeChanged(userId: string, from: string, to: string, changedBy: string) {
    await this.log({
      userId: changedBy,
      action: 'ACCOUNT_TYPE_CHANGED',
      entityType: 'User',
      entityId: userId,
      changes: { from, to },
    });
  }

  async logRoleAssigned(userId: string, targetUserId: string, role: string, planOwnerId: string) {
    await this.log({
      userId,
      action: 'ROLE_ASSIGNED',
      entityType: 'PlanShare',
      entityId: targetUserId,
      changes: { role, planOwnerId },
    });
  }

  async logRoleChanged(userId: string, targetUserId: string, fromRole: string, toRole: string) {
    await this.log({
      userId,
      action: 'ROLE_CHANGED',
      entityType: 'PlanShare',
      entityId: targetUserId,
      changes: { from: fromRole, to: toRole },
    });
  }

  async logRoleRevoked(userId: string, targetUserId: string, role: string) {
    await this.log({
      userId,
      action: 'ROLE_REVOKED',
      entityType: 'PlanShare',
      entityId: targetUserId,
      changes: { role },
    });
  }

  async logInvitationSent(userId: string, invitationId: string, recipientEmail: string, role: string) {
    await this.log({
      userId,
      action: 'INVITATION_SENT',
      entityType: 'Invitation',
      entityId: invitationId,
      changes: { recipientEmail, role },
    });
  }

  async logInvitationAccepted(userId: string, invitationId: string, role: string) {
    await this.log({
      userId,
      action: 'INVITATION_ACCEPTED',
      entityType: 'Invitation',
      entityId: invitationId,
      changes: { role },
    });
  }

  async logSponsorshipCreated(userId: string, sponsorId: string, fundingType: string) {
    await this.log({
      userId,
      action: 'SPONSORSHIP_CREATED',
      entityType: 'User',
      entityId: userId,
      changes: { sponsorId, fundingType },
    });
  }

  async logSponsorshipRemoved(userId: string, sponsorId: string, reason?: string) {
    await this.log({
      userId,
      action: 'SPONSORSHIP_REMOVED',
      entityType: 'User',
      entityId: userId,
      changes: { sponsorId, reason },
    });
  }

  async logPermissionChanged(userId: string, targetUserId: string, section: string, from: string, to: string) {
    await this.log({
      userId,
      action: 'PERMISSION_CHANGED',
      entityType: 'PlanShare',
      entityId: targetUserId,
      changes: { section, from, to },
    });
  }

  async logAdminAction(adminId: string, action: string, entityType: string, entityId: string, details?: Record<string, unknown>) {
    await this.log({
      userId: adminId,
      action: `ADMIN_${action}`,
      entityType,
      entityId,
      changes: details,
    });
  }

  async getLogsForUser(userId: string, limit = 50, offset = 0) {
    return this.prisma.auditLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async getLogsForEntity(entityType: string, entityId: string, limit = 50) {
    return this.prisma.auditLog.findMany({
      where: { entityType, entityId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  async getRecentLogs(limit = 100) {
    return this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: { select: { email: true } },
      },
    });
  }
}
