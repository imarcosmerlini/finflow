import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [WalletsService, PrismaService],
  exports: [WalletsService],
})
export class WalletsModule {}
