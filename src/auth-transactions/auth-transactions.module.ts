import { Module } from '@nestjs/common';
import { AuthTransactionsService } from './auth-transactions.service';
import { ErrorsService } from '../errors/errors.service';

@Module({
  providers: [AuthTransactionsService, ErrorsService],
  exports: [AuthTransactionsService],
})
export class AuthTransactionsModule {}
