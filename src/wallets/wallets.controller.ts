import { Body, Controller, Post } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { IWallet } from './iwallet';

@Controller('wallets')
export class WalletsController {
  constructor(private walletService: WalletsService) {}

  @Post('')
  addCredit(@Body() wallet: IWallet) {
    return this.walletService.addCredit(wallet);
  }
}
