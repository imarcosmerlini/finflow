import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ErrorsService } from '../errors/errors.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      global: true,
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, ErrorsService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
