import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthTransactionsModule } from './auth-transactions/auth-transactions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ErrorsService } from './errors/errors.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    WalletsModule,
    TransactionsModule,
    AuthTransactionsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ErrorsService],
})
export class AppModule {}
