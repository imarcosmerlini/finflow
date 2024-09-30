import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from '../auth/auth.guard';
import { ITransactions } from './itransactions';
import { AuthService } from '../auth/auth.service';

@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionService: TransactionsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard)
  @Post('')
  create(
    @Headers('authorization') auth: string,
    @Body() transaction: ITransactions,
  ) {
    const token = auth?.split(' ')[1];
    const tokenData = this.authService.decodeToken(token);
    return this.transactionService.create(transaction, tokenData);
  }
}
