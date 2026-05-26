import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    // Check if user is admin
    if (requiredRoles.includes('ADMIN')) {
      const dbUser = await this.prisma.user.findUnique({ where: { id: user.sub } });
      return dbUser?.isAdmin === true;
    }

    // Check if user is a PLAN_OWNER
    if (requiredRoles.includes('PLAN_OWNER')) {
      const profile = await this.prisma.profile.findFirst({
        where: { userId: user.sub, isPlanOwner: true },
      });
      return !!profile;
    }

    // Check share roles (EXECUTOR, CONTRIBUTOR, BENEFICIARY, VIEWER)
    // This checks if the user has ANY share with the required role
    const planId = request.params?.planId || request.query?.planId;

    if (planId) {
      const share = await this.prisma.planShare.findFirst({
        where: {
          sharedWithId: user.sub,
          ownerId: planId,
          role: { in: requiredRoles as any },
          acceptedAt: { not: null },
          revokedAt: null,
        },
      });
      return !!share;
    }

    // If no planId, check if user has any active share with required role
    const share = await this.prisma.planShare.findFirst({
      where: {
        sharedWithId: user.sub,
        role: { in: requiredRoles as any },
        acceptedAt: { not: null },
        revokedAt: null,
      },
    });
    return !!share;
  }
}
