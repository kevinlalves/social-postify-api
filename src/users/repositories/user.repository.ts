import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({ data });
  }

  update(data: Prisma.UserUpdateInput, where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.update({ where, data });
  }

  findUnique(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({ where });
  }

  findMany(where: Prisma.UserWhereInput, options?: { take?: number; include?: Prisma.UserInclude }) {
    return this.prismaService.user.findMany({ where, ...options });
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({ where });
  }

  deleteMany(where?: Prisma.UserWhereInput) {
    return this.prismaService.user.deleteMany({ where });
  }
}
