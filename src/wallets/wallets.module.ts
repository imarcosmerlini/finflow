import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../prisma.service';
import { WalletsController } from './wallets.controller';
import { UsersService } from "../users/users.service";

@Module({
  providers: [WalletsService, PrismaService, UsersService],
  exports: [WalletsService],
  controllers: [WalletsController],
})
export class WalletsModule {}
