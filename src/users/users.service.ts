import { Injectable } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

// Only for tests, after will be the prisma
export type IUser = {
  id: number;
  name: string;
  document: string;
  email: string;
  password: string;
  emailNotification: boolean;
  smsNotification: boolean;
  createdAt: string;
  updatedAt: string;
  type: string;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  private readonly saltOrRounds = 10;

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(): Promise<User | undefined> {
    // const passwordHash = await bcrypt.hash(password, this.saltOrRounds);
    return undefined;
  }
}
