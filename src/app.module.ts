import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PublicationsModule } from './publications/publications.module';
import { PlatformsModule } from './platforms/platforms.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/setup-envs';

@Module({
  imports: [
    UsersModule,
    PublicationsModule,
    PlatformsModule,
    PrismaModule,
    AuthModule,
    AttachmentsModule,
    ConfigModule.forRoot({
      load: configuration(),
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
