import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const { session } = context.switchToHttp().getRequest();
    if (!session.token) throw new UnauthorizedException();

    try {
      const payload: JwtPayloadType = await this.jwtService.verifyAsync(session.token, {
        secret: this.configService.get<string>('jwt.secret'),
      });

      session.userId = payload.userId;
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

type JwtPayloadType = {
  userId: string;
};
