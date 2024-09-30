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

  async addCredit(wallet: IWallet): Promise<Wallet | any> {
    const amount = await this.prisma.wallet.findUniqueOrThrow({
      where: { id: wallet.id },
    });

    const newAmount = amount.amount + wallet.amount;
    const updatedWallet = await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: { amount: newAmount },
    });

    return updatedWallet;
  }

  async updateAmount(id: number, amount: number): Promise<Wallet | any> {
    return this.prisma.wallet.update({
      where: { id: id },
      data: { amount: amount },
    });
  }

  async findFirst(userId: number): Promise<any> {
    return this.prisma.wallet.findFirst({
      where: { userId: userId },
    });
  }
}
