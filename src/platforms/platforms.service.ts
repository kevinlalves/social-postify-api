import { Injectable } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { PlatformRepository } from './repositories/platform.repository';

@Injectable()
export class PlatformsService {
  constructor(private readonly platformRepository: PlatformRepository) {}

  create({ name }: CreatePlatformDto) {
    return this.platformRepository.create({ name });
  }

  findAll() {
    return this.platformRepository.findMany({});
  }

  findOne(id: string) {
    return this.platformRepository.findUnique({ id });
  }

  update(id: string, updatePlatformDto: UpdatePlatformDto) {
    return this.platformRepository.update(updatePlatformDto, { id });
  }

  remove(id: string) {
    return this.platformRepository.delete({ id });
  }
}
