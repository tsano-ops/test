import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentDto, UpdateDocumentDto } from './dto/document.dto';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, category?: string) {
    return this.prisma.document.findMany({
      where: {
        userId,
        ...(category ? { category } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(userId: string, dto: CreateDocumentDto) {
    return this.prisma.document.create({
      data: { userId, ...dto },
    });
  }

  async update(userId: string, id: string, dto: UpdateDocumentDto) {
    const record = await this.prisma.document.findFirst({ where: { id, userId } });
    if (!record) throw new NotFoundException('Document not found');
    return this.prisma.document.update({ where: { id }, data: dto });
  }

  async remove(userId: string, id: string) {
    const record = await this.prisma.document.findFirst({ where: { id, userId } });
    if (!record) throw new NotFoundException('Document not found');
    await this.prisma.document.delete({ where: { id } });
    return { success: true };
  }
}
