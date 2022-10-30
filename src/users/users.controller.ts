import { Body, Controller, Post } from '@nestjs/common';
import { User } from './users.schema';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }
}
