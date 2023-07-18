import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PublicationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.PublicationCreateInput) {
    return this.prismaService.publication.create({ data });
  }

  update(data: Prisma.PublicationUpdateInput, where: Prisma.PublicationWhereUniqueInput) {
    return this.prismaService.publication.update({ where, data });
  }

  findUnique(where: Prisma.PublicationWhereUniqueInput) {
    return this.prismaService.publication.findUnique({ where });
  }

  findMany(where: Prisma.PublicationWhereInput, options?: { take: number }) {
    return this.prismaService.publication.findMany({ where, ...options });
  }

  delete(where: Prisma.PublicationWhereUniqueInput) {
    return this.prismaService.publication.delete({ where });
  }
}
