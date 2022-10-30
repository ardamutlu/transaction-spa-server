import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/users.schema';
import { UserDecorator } from 'src/users/users.decorator';
import { Balance } from './balance.schema';
import { BalanceService } from './balance.service';

@Controller('balance')
@UseGuards(JwtAuthGuard)
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  async findOne(@Body() balance: Balance): Promise<Balance> {
    return this.balanceService.findOne(balance);
  }

  @Post('create')
  async save(
    @UserDecorator() user: User,
    @Body() balance: Balance,
  ): Promise<Balance> {
    return this.balanceService.save(user, balance);
  }

  @Put('update')
  async findOneAndUpdate(
    @UserDecorator() user: User,
    @Body() balance: Balance,
  ): Promise<Balance> {
    return this.balanceService.findOneAndUpdate(user, balance);
  }
}
