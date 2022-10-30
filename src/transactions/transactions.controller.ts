import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDecorator } from 'src/users/users.decorator';
import { User } from 'src/users/users.schema';
import { Transaction } from './transactions.schema';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  async findAll(@UserDecorator() user: User): Promise<Transaction[]> {
    return this.transactionsService.findAll({ user });
  }

  @Post('create')
  async save(
    @UserDecorator() user: User,
    @Body() transaction: Transaction,
  ): Promise<Transaction> {
    return this.transactionsService.save(user, transaction);
  }

  @Put('approve/:id')
  async approve(
    @UserDecorator() user: User,
    @Param() { id },
  ): Promise<Transaction> {
    return this.transactionsService.approve(user, id);
  }

  @Put('cancel/:id')
  async cancel(
    @UserDecorator() user: User,
    @Param() { id },
  ): Promise<Transaction> {
    return this.transactionsService.cancel(user, id);
  }
}
