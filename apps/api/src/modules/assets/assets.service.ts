import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto } from './dto/asset.dto';
import { AssetCategory, AssetStatus } from '@prisma/client';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  private async getProfileId(userId: string): Promise<string> {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile.id;
  }

  async findAll(userId: string) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.asset.findMany({
      where: { profileId },
      orderBy: { category: 'asc' },
    });
  }

  async findByCategory(userId: string, category: AssetCategory) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.asset.findMany({
      where: { profileId, category },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateAssetDto) {
    const profileId = await this.getProfileId(userId);
    return this.prisma.asset.create({
      data: { profileId, ...dto },
    });
  }

  async update(userId: string, id: string, dto: UpdateAssetDto) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.asset.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Asset not found');
    return this.prisma.asset.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    const profileId = await this.getProfileId(userId);
    const record = await this.prisma.asset.findFirst({ where: { id, profileId } });
    if (!record) throw new NotFoundException('Asset not found');
    return this.prisma.asset.update({
      where: { id },
      data: { status: AssetStatus.INACTIVE },
    });
  }

  async getNetWorth(userId: string) {
    const profileId = await this.getProfileId(userId);

    const assets = await this.prisma.asset.findMany({
      where: { profileId, status: AssetStatus.ACTIVE },
      select: { value: true, category: true },
    });

    const liabilities = await this.prisma.liability.findMany({
      where: { profileId },
      select: { amount: true },
    });

    const totalAssets = assets.reduce(
      (sum, a) => sum + Number(a.value),
      0,
    );

    const totalLiabilities = liabilities.reduce(
      (sum, l) => sum + Number(l.amount),
      0,
    );

    const byCategory: Record<string, number> = {};
    for (const asset of assets) {
      byCategory[asset.category] = (byCategory[asset.category] ?? 0) + Number(asset.value);
    }

    const byCategoryArray = Object.entries(byCategory).map(([category, total]) => ({
      category,
      total,
    }));

    return {
      total_assets: totalAssets,
      total_liabilities: totalLiabilities,
      net_worth: totalAssets - totalLiabilities,
      by_category: byCategoryArray,
    };
  }
}
