import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserRepository } from '../users/repositories/user.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService) {}

  async signIn({ email, password }: SignInDto) {
    const user = await this.userRepository.findUnique({ email });
    const isValidPassword = compare(password, user.password);
    if (!isValidPassword) throw new HttpException('The credential information does no exist', HttpStatus.UNAUTHORIZED);

    return this.jwtService.signAsync({ userId: user.id });
  }
}
