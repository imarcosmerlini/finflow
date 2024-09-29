import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { IWallet } from './iwallet';
import { AuthGuard } from '../auth/auth.guard';

@Controller('wallets')
export class WalletsController {
  constructor(private walletService: WalletsService) {}

  @UseGuards(AuthGuard)
  @Post('')
  addCredit(@Body() wallet: IWallet) {
    return this.walletService.addCredit(wallet);
  }
}
