import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UserRepository } from '../repositories/user.repository';
import { AttachmentsModule } from '../../attachments/attachments.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { createUserDto, file, user } from '../../../test/fixtures';
import { ConfigModule } from '@nestjs/config';
import { AttachmentsService } from '../../attachments/attachments.service';
import * as bcrypt from 'bcrypt';
import { AttachmentRepository } from '../../attachments/repositories/attachment.repository';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: UserRepository;
  let attachmentsService: AttachmentsService;
  let attachmentRepository: AttachmentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AttachmentsModule,
        PrismaModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
          isGlobal: true,
        }),
      ],
      providers: [UsersService, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<UserRepository>(UserRepository);
    attachmentRepository = module.get<AttachmentRepository>(AttachmentRepository);
    attachmentsService = module.get<AttachmentsService>(AttachmentsService);
    await Promise.all([userRepository.deleteMany(), attachmentRepository.deleteMany()]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      await userRepository.create(user);

      const users = await service.findAll();

      expect(users).toHaveLength(1);
      expect(users[0]).toEqual(expect.objectContaining(user));
    });
  });

  describe('findOne', () => {
    it('should return a user with the given id', async () => {
      const anotherUser = { ...user, id: 'the-id', email: 'choosen@gmail.com' };
      await Promise.all([userRepository.create(user), userRepository.create(anotherUser)]);

      const choosenUser = await service.findOne('the-id');

      expect(choosenUser).toEqual(expect.objectContaining(anotherUser));
    });
  });

  describe('create', () => {
    let createUserDtoWithAvatar: {
      avatar: Express.Multer.File;
      name: string;
      email: string;
      password: string;
    };

    beforeEach(() => {
      jest.spyOn(attachmentsService, 'storeFiles').mockResolvedValue(['attachmentId']);

      createUserDtoWithAvatar = {
        ...createUserDto,
        avatar: file,
      };
    });

    it('should create and return newUser', async () => {
      const result = await service.create(createUserDtoWithAvatar);

      await expect(userRepository.findMany({})).resolves.toHaveLength(1);
      expect(result).toEqual(await userRepository.findUnique({ email: createUserDtoWithAvatar.email }));
    });
  });
});
