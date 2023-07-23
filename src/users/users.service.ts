import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './repositories/user.repository';
import { AttachmentsService } from '../attachments/attachments.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly attachmentsService: AttachmentsService,
    private readonly configService: ConfigService,
  ) {}

  async create({ email, password, name, avatar }: CreateUserDto & { avatar: Express.Multer.File }) {
    const user = await this.userRepository.findUnique({ email });
    if (user) throw new HttpException('A user with the same email already exists', HttpStatus.CONFLICT);

    const passwordHash = await bcrypt.hash(password, 10);
    const [attachmentId] = await this.attachmentsService.storeFiles([avatar]);
    const newUser = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      avatar: {
        create: { id: attachmentId, url: `${this.configService.get<string>('aws.s3.base_url')}/${attachmentId}` },
      },
    });

    return newUser;
  }

  findAll() {
    return this.userRepository.findMany({}, { include: { avatar: true } });
  }

  findOne(id: string) {
    return this.userRepository.findUnique({ id });
  }

  update(id: string, { name, email }: UpdateUserDto) {
    return this.userRepository.update({ name, email }, { id });
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
