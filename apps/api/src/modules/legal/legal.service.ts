import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLegalDocumentDto, UpdateLegalDocumentDto, LegalDocumentType } from './dto/legal.dto';

@Injectable()
export class LegalService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string) {
    const docs = await this.prisma.document.findMany({
      where: {
        userId,
        category: { startsWith: 'LEGAL:' },
      },
      orderBy: { createdAt: 'desc' },
    });
    return docs.map((d) => this.mapToLegalDoc(d));
  }

  async findByType(userId: string, type: string) {
    const docs = await this.prisma.document.findMany({
      where: {
        userId,
        category: `LEGAL:${type.toUpperCase()}`,
      },
      orderBy: { createdAt: 'desc' },
    });
    return docs.map((d) => this.mapToLegalDoc(d));
  }

  async create(userId: string, dto: CreateLegalDocumentDto) {
    const doc = await this.prisma.document.create({
      data: {
        userId,
        fileName: dto.title,
        fileType: 'legal',
        fileSize: 0,
        s3Key: dto.documentId ?? '',
        category: `LEGAL:${dto.type}`,
        metadata: {
          type: dto.type,
          instructions: dto.instructions,
          templateUrl: dto.templateUrl,
          documentId: dto.documentId,
        } as any,
      },
    });
    return this.mapToLegalDoc(doc);
  }

  async update(userId: string, id: string, dto: UpdateLegalDocumentDto) {
    const existing = await this.prisma.document.findFirst({
      where: { id, userId, category: { startsWith: 'LEGAL:' } },
    });
    if (!existing) throw new NotFoundException('Legal document not found');

    const existingMeta = (existing.metadata as Record<string, any>) ?? {};

    const doc = await this.prisma.document.update({
      where: { id },
      data: {
        fileName: dto.title ?? existing.fileName,
        category: dto.type ? `LEGAL:${dto.type}` : existing.category,
        s3Key: dto.documentId ?? existing.s3Key,
        metadata: {
          ...existingMeta,
          ...(dto.type ? { type: dto.type } : {}),
          ...(dto.instructions !== undefined ? { instructions: dto.instructions } : {}),
          ...(dto.templateUrl !== undefined ? { templateUrl: dto.templateUrl } : {}),
          ...(dto.documentId !== undefined ? { documentId: dto.documentId } : {}),
        } as any,
      },
    });
    return this.mapToLegalDoc(doc);
  }

  async remove(userId: string, id: string) {
    const existing = await this.prisma.document.findFirst({
      where: { id, userId, category: { startsWith: 'LEGAL:' } },
    });
    if (!existing) throw new NotFoundException('Legal document not found');

    await this.prisma.document.delete({ where: { id } });
    return { success: true };
  }

  private mapToLegalDoc(doc: any) {
    const meta = (doc.metadata as Record<string, any>) ?? {};
    return {
      id: doc.id,
      title: doc.fileName,
      type: meta.type ?? doc.category?.replace('LEGAL:', ''),
      instructions: meta.instructions ?? null,
      templateUrl: meta.templateUrl ?? null,
      documentId: meta.documentId ?? null,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
