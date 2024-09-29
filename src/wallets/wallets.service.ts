import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IWallet } from './iwallet';
import { Wallet } from '@prisma/client';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  async create(wallet: IWallet): Promise<Wallet | any> {
    const newWallet = await this.prisma.wallet.create({ data: wallet });

    return newWallet;
  }
}
