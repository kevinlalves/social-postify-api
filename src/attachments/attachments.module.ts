import { Global, Module } from '@nestjs/common';
import { AttachmentsService } from './attachments.service';
import { AwsAttachmentsService } from './aws/aws-attachments.service';
import { AttachmentRepository } from './repositories/attachment.repository';

@Global()
@Module({
  providers: [{ provide: AttachmentsService, useClass: AwsAttachmentsService }, AttachmentRepository],
  exports: [{ provide: AttachmentsService, useClass: AwsAttachmentsService }, AttachmentRepository],
})
export class AttachmentsModule {}
