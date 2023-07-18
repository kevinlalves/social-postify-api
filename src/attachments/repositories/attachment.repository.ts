import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AttachmentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.AttachmentCreateInput) {
    return this.prismaService.attachment.create({ data });
  }

  deleteMany(where?: Prisma.AttachmentWhereInput) {
    return this.prismaService.attachment.deleteMany({ where });
  }
}
