import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../prisma.service';
import { WalletsController } from './wallets.controller';
import { UsersService } from '../users/users.service';
import { ErrorsService } from '../errors/errors.service';

@Module({
  providers: [WalletsService, PrismaService, UsersService, ErrorsService],
  exports: [WalletsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
