import { Stream } from 'stream';

export const file: Express.Multer.File = {
  fieldname: 'avatar',
  originalname: 'avatar.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  buffer: Buffer.from('mock file data'),
  size: 1000,
  destination: './uploads/',
  filename: 'avatar.jpg',
  path: './uploads/avatar.jpg',
  stream: new Stream.Readable(),
};
