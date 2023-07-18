import { Module } from '@nestjs/common';
import { PlatformsService } from './platforms.service';
import { PlatformsController } from './platforms.controller';
import { PlatformRepository } from './repositories/platform.repository';

@Module({
  controllers: [PlatformsController],
  providers: [PlatformsService, PlatformRepository],
  exports: [PlatformRepository],
})
export class PlatformsModule {}
