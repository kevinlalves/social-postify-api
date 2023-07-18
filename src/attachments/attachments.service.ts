export abstract class AttachmentsService {
  abstract storeFiles(files: Express.Multer.File[]): Promise<string[]>;
}
