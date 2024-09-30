import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IUser } from './iuser';
import { WalletsService } from '../wallets/wallets.service';
import { ErrorsService } from '../errors/errors.service';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private wallet: WalletsService,
    private errorService: ErrorsService,
  ) {}
  private readonly saltOrRounds = 10;

  async findOne(email: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async create(user: IUser): Promise<User | any> {
    const isUnique = await this.prisma.user.findMany({
      where: {
        OR: [
          {
            email: user.email,
          },
          {
            document: user.document,
          },
        ],
      },
    });

    if (isUnique.length === 0) {
      user.password = await bcrypt.hash(user.password, this.saltOrRounds);
      const newUser = await this.prisma.user.create({ data: user });
      await this.wallet.create({ userId: newUser.id, amount: 0 });

      return newUser;
    } else {
      await this.errorService.notFound('User already created');
    }
  }
}
