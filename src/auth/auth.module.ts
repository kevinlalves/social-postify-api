import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: new ConfigService().get<string>('jwt.secret'),
      signOptions: { expiresIn: new ConfigService().get<number>('jwt.expires_in') },
    }),
  ],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
