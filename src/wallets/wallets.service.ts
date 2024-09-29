import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IWallet } from './iwallet';
import { Wallet } from '@prisma/client';
import Decimal from 'decimal.js';

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

    const decimalValue = new Decimal(amount.amount);
    const newAmount = decimalValue.add(new Decimal(wallet.amount));

    const updatedWallet = await this.prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        amount: newAmount,
      },
    });

    return updatedWallet;
  }
}
