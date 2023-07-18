import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export const user: User = {
  id: 'user-id',
  name: 'test user',
  email: 'test@test.com',
  password: 'secret',
  createdAt: new Date(2023, 4, 5),
  updatedAt: new Date(2023, 4, 5),
};

export const createUserDto: CreateUserDto = {
  name: 'test user',
  email: 'test@test.com',
  password: 'really-super-secret',
};
