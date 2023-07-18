import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PlatformRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.PlatformCreateInput) {
    return this.prismaService.platform.create({ data });
  }

  update(data: Prisma.PlatformUpdateInput, where: Prisma.PlatformWhereUniqueInput) {
    return this.prismaService.platform.update({ where, data });
  }

  findUnique(where: Prisma.PlatformWhereUniqueInput) {
    return this.prismaService.platform.findUnique({ where });
  }

  findMany(where: Prisma.PlatformWhereInput, options?: { take: number }) {
    return this.prismaService.platform.findMany({ where, ...options });
  }

  delete(where: Prisma.PlatformWhereUniqueInput) {
    return this.prismaService.platform.delete({ where });
  }
}
