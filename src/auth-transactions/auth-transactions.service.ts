import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ErrorsService } from '../errors/errors.service';

@Injectable()
export class AuthTransactionsService {
  constructor(
    private readonly configService: ConfigService,
    private errorService: ErrorsService,
  ) {}

  async validate() {
    try {
      const apiValidation = this.configService.get<string>('API_VALIDATION');
      const response = await axios.get(apiValidation);
      return response.data;
    } catch (e) {
      await this.errorService.badRequest(e.message);
    }
  }
}
