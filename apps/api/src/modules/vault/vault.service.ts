import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VaultService {
  constructor(private prisma: PrismaService) {}

  async getDocuments(userId: string, filters: { category?: string; search?: string }) {
    const where: any = { userId };

    if (filters.category) {
      where.category = filters.category;
    }

    if (filters.search) {
      where.OR = [
        { fileName: { contains: filters.search, mode: 'insensitive' } },
        { category: { contains: filters.search, mode: 'insensitive' } },
        { tags: { has: filters.search } },
      ];
    }

    return this.prisma.document.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCredentials(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) return [];

    const assets = await this.prisma.asset.findMany({
      where: { profileId: profile.id },
      include: { credentials: true },
    });

    return assets.flatMap((asset) =>
      asset.credentials.map((cred) => ({
        ...cred,
        assetName: asset.name,
        assetCategory: asset.category,
      })),
    );
  }

  async search(userId: string, q: string) {
    return this.prisma.document.findMany({
      where: {
        userId,
        OR: [
          { fileName: { contains: q, mode: 'insensitive' } },
          { category: { contains: q, mode: 'insensitive' } },
          { tags: { has: q } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
