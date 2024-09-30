import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITransactions } from './itransactions';
import { AuthTransactionsService } from '../auth-transactions/auth-transactions.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ErrorsService } from '../errors/errors.service';
import { JwtService } from '@nestjs/jwt';
import { WalletsService } from '../wallets/wallets.service';

type tokenData = { id: number; email: string; type: string };

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private authTransaction: AuthTransactionsService,
    private notificationService: NotificationsService,
    private errorService: ErrorsService,
    private readonly jwtService: JwtService,
    private walletService: WalletsService,
  ) {}

  async create(
    transaction: ITransactions,
    tokenData: tokenData,
  ): Promise<ITransactions | any> {
    await this.validateUser(tokenData.id, transaction.transactionFromId);

    const userFrom = await this.findUser(transaction.transactionFromId);
    const userTo = await this.findUser(transaction.transactionToId);

    await this.validateTypeUser(userFrom.type);

    const newTransaction = await this.prisma.transaction.create({
      data: transaction,
    });

    const walletFrom = await this.walletService.findFirst(userFrom.id);

    await this.validateFundsWallet(walletFrom.amount, transaction.amount);

    const validationResponse = await this.validateTransaction();
    if (validationResponse !== 'Autorizado') {
      await this.updateTransaction(newTransaction.id, 'unauthorized');
      await this.errorService.badRequest('Unauthorized transaction');
    }

    const walletTo = await this.walletService.findFirst(userTo.id);

    const newAmountTo = walletTo.amount + transaction.amount;
    await this.walletService.updateAmount(walletTo.id, newAmountTo);

    const newAmountFrom = walletFrom.amount - transaction.amount;
    await this.walletService.updateAmount(walletFrom.id, newAmountFrom);

    await this.updateTransaction(newTransaction.id, 'completed');
    newTransaction.status = 'completed';

    await this.notificationService.sendNotifications({
      transaction: newTransaction.id,
      recipient: userTo.name,
      sender: userFrom.name,
      amount: newTransaction.amount,
      message: `Você transferiu R$ ${newTransaction.amount} para ${userTo.name}`,
    });

    return newTransaction;
  }

  async findUser(userId: number): Promise<ITransactions | any> {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  }

  async validateUser(userId: number, transactionUserId: number): Promise<any> {
    if (userId !== transactionUserId) {
      await this.errorService.badRequest(
        'Authenticated user and sender user are not the same',
      );
    }
  }

  async validateTypeUser(type: string): Promise<any> {
    if (type == 'company') {
      await this.errorService.badRequest(
        'Company users cannot transfer currency',
      );
    }
  }

  async validateFundsWallet(
    walletFunds: number,
    transactionValue: number,
  ): Promise<any> {
    if (walletFunds < transactionValue) {
      await this.errorService.badRequest('Insufficient funds');
    }
  }

  async validateTransaction(): Promise<any> {
    const authTransaction = await this.authTransaction.validate();
    return authTransaction.find((item) => item.message)?.message;
  }

  async updateTransaction(id: number, status: string): Promise<any> {
    await this.prisma.transaction.update({
      where: { id: id },
      data: { status: status },
    });
  }
}
