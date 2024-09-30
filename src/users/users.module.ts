import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { WalletsService } from '../wallets/wallets.service';
import { ErrorsService } from '../errors/errors.service';

@Module({
  providers: [UsersService, PrismaService, WalletsService, ErrorsService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
