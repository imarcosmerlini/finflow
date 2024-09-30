import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard';
import { ITransactions } from './itransactions';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService) {}

  @UseGuards(AuthGuard)
  @Post('')
  create(@Body() transaction: ITransactions) {
    return this.transactionService.create(transaction);
  }
}
