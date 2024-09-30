import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorsService } from '../errors/errors.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private errorService: ErrorsService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      await this.errorService.notFound('User not found');
    }

    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      await this.errorService.unauthorized('Incorrect password');
    }

    const payload = { sub: user.id, email: user.email, type: user.type };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
