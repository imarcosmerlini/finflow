import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';
// import { User, Prisma } from '@prisma/client';

// Only for tests, after will be the prisma
export type User = any;

@Injectable()
export class UsersService {
  // constructor(private prisma: PrismaService) {}

  private readonly users = [
    {
      userId: 1,
      email: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      email: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === username);
  }
}
