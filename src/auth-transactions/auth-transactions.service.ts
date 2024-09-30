import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthTransactionsService {
  constructor(private readonly configService: ConfigService) {}

  async validate() {
    const apiValidation = this.configService.get<string>('API_VALIDATION');
    const response = await axios.get(apiValidation);
    return response.data;
  }
}
