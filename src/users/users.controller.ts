import { Controller, Post, Body } from '@nestjs/common';
import { IUser } from './iuser';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('')
  create(@Body() user: IUser) {
    return this.userService.create(user);
  }
}
