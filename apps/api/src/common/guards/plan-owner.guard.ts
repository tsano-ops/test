import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlanOwnerGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const profile = await this.prisma.profile.findFirst({
      where: { userId: user.sub, isPlanOwner: true },
    });

    if (!profile) {
      throw new ForbiddenException('PlanOwner access required.');
    }

    return true;
  }
}
