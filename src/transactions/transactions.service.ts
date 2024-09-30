import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ITransactions } from './itransactions';
import { AuthTransactionsService } from '../auth-transactions/auth-transactions.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private authTransaction: AuthTransactionsService,
    private notificationService: NotificationsService,
  ) {}

  async create(transaction: ITransactions): Promise<ITransactions | any> {
    const userFrom = await this.findUser(transaction.transactionFromId);
    const userTo = await this.findUser(transaction.transactionToId);

    if (userFrom.type == 'company') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Company users cannot transfer currency',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Company users cannot transfer currency',
        },
      );
    }

    const newTransaction = await this.prisma.transaction.create({
      data: transaction,
    });
    const walletFrom = await this.prisma.wallet.findFirst({
      where: { userId: userFrom.id },
    });

    if (walletFrom.amount < transaction.amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Insufficient funds',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Insufficient funds',
        },
      );
    }

    const authTransaction = await this.authTransaction.validate();
    const messageValue = authTransaction.find((item) => item.message)?.message;

    if (messageValue !== 'Autorizado') {
      await this.prisma.transaction.update({
        where: { id: newTransaction.id },
        data: { status: 'unauthorized' },
      });

      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Unauthorized transaction',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: 'Unauthorized transaction',
        },
      );
    }

    const walletTo = await this.prisma.wallet.findFirst({
      where: { userId: userTo.id },
    });

    const newAmountTo = walletTo.amount + transaction.amount;
    await this.prisma.wallet.update({
      where: { id: walletTo.id },
      data: { amount: newAmountTo },
    });

    const newAmountFrom = walletFrom.amount - transaction.amount;
    await this.prisma.wallet.update({
      where: { id: walletFrom.id },
      data: { amount: newAmountFrom },
    });

    await this.prisma.transaction.update({
      where: { id: newTransaction.id },
      data: { status: 'completed' },
    });
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
}
