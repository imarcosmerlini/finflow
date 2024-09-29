import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { WalletsService } from '../wallets/wallets.service';

@Module({
  providers: [UsersService, PrismaService, WalletsService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
