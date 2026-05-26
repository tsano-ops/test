import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRelationshipDto, UpdateRelationshipDto } from './dto/relationship.dto';

@Injectable()
export class RelationshipsService {
  constructor(private prisma: PrismaService) {}

  private async getOwnerProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async getTree(userId: string) {
    const owner = await this.getOwnerProfile(userId);

    const edges = await this.prisma.relationship.findMany({
      where: {
        OR: [
          { fromProfileId: owner.id },
          { toProfileId: owner.id },
        ],
      },
    });

    const profileIds = new Set<string>();
    profileIds.add(owner.id);
    for (const edge of edges) {
      profileIds.add(edge.fromProfileId);
      profileIds.add(edge.toProfileId);
    }

    const nodes = await this.prisma.profile.findMany({
      where: { id: { in: Array.from(profileIds) } },
    });

    return { nodes, edges };
  }

  async create(userId: string, dto: CreateRelationshipDto) {
    const owner = await this.getOwnerProfile(userId);

    const isOwnerProfile =
      dto.fromProfileId === owner.id || dto.toProfileId === owner.id;

    if (!isOwnerProfile) {
      const ownerLinked = await this.prisma.relationship.findFirst({
        where: {
          OR: [
            { fromProfileId: owner.id, toProfileId: dto.fromProfileId },
            { fromProfileId: dto.fromProfileId, toProfileId: owner.id },
          ],
        },
      });
      if (!ownerLinked) {
        throw new ForbiddenException(
          'fromProfileId must belong to or be linked to the plan owner',
        );
      }
    }

    return this.prisma.relationship.create({ data: dto });
  }

  async update(userId: string, id: string, dto: UpdateRelationshipDto) {
    const owner = await this.getOwnerProfile(userId);

    const relationship = await this.prisma.relationship.findUnique({ where: { id } });
    if (!relationship) throw new NotFoundException('Relationship not found');

    const ownsRelationship =
      relationship.fromProfileId === owner.id ||
      relationship.toProfileId === owner.id;

    if (!ownsRelationship) {
      throw new ForbiddenException('Access denied');
    }

    return this.prisma.relationship.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    const owner = await this.getOwnerProfile(userId);

    const relationship = await this.prisma.relationship.findUnique({ where: { id } });
    if (!relationship) throw new NotFoundException('Relationship not found');

    const ownsRelationship =
      relationship.fromProfileId === owner.id ||
      relationship.toProfileId === owner.id;

    if (!ownsRelationship) {
      throw new ForbiddenException('Access denied');
    }

    await this.prisma.relationship.delete({ where: { id } });
    return { success: true };
  }
}
