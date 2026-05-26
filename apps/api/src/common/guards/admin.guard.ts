import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return false;

    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: { isAdmin: true },
    });

    if (!dbUser?.isAdmin) {
      throw new ForbiddenException('Admin access required.');
    }

    return true;
  }
}
