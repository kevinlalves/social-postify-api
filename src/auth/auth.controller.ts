import { Body, Controller, Get, HttpCode, Post, Session, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { UserRepository } from '../users/repositories/user.repository';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userRepository: UserRepository) {}

  @HttpCode(200)
  @Post('signin')
  async signIn(@Session() session: Record<string, string>, @Body() signInDto: SignInDto) {
    session.token = await this.authService.signIn(signInDto);

    return 'ok';
  }

  @UseGuards(AuthGuard)
  @Get('current-user')
  async current(@Session() session: Record<string, string>) {
    const user = await this.userRepository.findUnique({ id: session.userId });

    return user;
  }
}
