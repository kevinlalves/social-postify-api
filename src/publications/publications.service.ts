import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationRepository } from './repositories/publication.repository';
import { AttachmentsService } from 'src/attachments/attachments.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly attachmentsService: AttachmentsService,
    private readonly configService: ConfigService,
  ) {}

  async create({
    title,
    text,
    images,
    publishAt,
    platformIds,
    userId,
  }: CreatePublicationDto & { images: Express.Multer.File[]; userId: string }) {
    const attachmentIds = await this.attachmentsService.storeFiles(images);

    const imageAttachments = attachmentIds.map((id) => ({
      id,
      url: `${this.configService.get<string>('ATTACHMENT_BASE_URL')}/${id}`,
    }));

    return this.publicationRepository.create({
      title,
      text,
      images: { create: imageAttachments },
      publishAt: new Date(publishAt),
      platforms: { connect: platformIds.map((id) => ({ id })) },
      user: { connect: { id: userId } },
    });
  }

  findAll() {
    return this.publicationRepository.findMany({});
  }

  findOne(id: string) {
    return this.publicationRepository.findUnique({ id });
  }

  update(id: string, updatePublicationDto: UpdatePublicationDto) {
    return `This action updates a #${id} publication`;
  }

  remove(id: string) {
    return this.publicationRepository.delete({ id });
  }
}
