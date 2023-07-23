import { Injectable } from '@nestjs/common';
import { AttachmentsService } from '../attachments.service';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsAttachmentsService implements AttachmentsService {
  private readonly s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: configService.get<string>('aws.id'),
        secretAccessKey: configService.get<string>('aws.secret'),
      },
      region: 'us-east-1',
    });
  }

  storeFiles(files: Express.Multer.File[]) {
    return Promise.all(
      files.map(async (file) => {
        const id = crypto.randomUUID();
        const uploadParams = {
          Bucket: this.configService.get<string>('aws.s3.bucket_name'),
          Key: id,
          Body: file.buffer,
        };

        await this.s3.send(new PutObjectCommand(uploadParams));

        return id;
      }),
    );
  }
}
