import { Test, TestingModule } from '@nestjs/testing';
import { AuthTransactionsService } from './auth-transactions.service';

describe('AuthTransactionsService', () => {
  let service: AuthTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthTransactionsService],
    }).compile();

    service = module.get<AuthTransactionsService>(AuthTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
