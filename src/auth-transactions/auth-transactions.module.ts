import { Module } from '@nestjs/common';
import { AuthTransactionsService } from './auth-transactions.service';

@Module({
  providers: [AuthTransactionsService],
  exports: [AuthTransactionsService],
})
export class AuthTransactionsModule {}
