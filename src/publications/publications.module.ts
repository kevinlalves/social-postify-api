import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationRepository } from './repositories/publication.repository';

@Module({
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationRepository],
})
export class PublicationsModule {}
