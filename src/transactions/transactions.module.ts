import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { PrismaService } from '../prisma.service';
import { WalletsService } from '../wallets/wallets.service';
import { AuthTransactionsService } from '../auth-transactions/auth-transactions.service';
import { NotificationsService } from '../notifications/notifications.service';
import { ErrorsService } from '../errors/errors.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    PrismaService,
    WalletsService,
    AuthTransactionsService,
    NotificationsService,
    ErrorsService,
    AuthService,
    UsersService,
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
