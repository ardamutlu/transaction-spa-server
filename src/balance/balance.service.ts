import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import { Balance, BalanceDocument } from './balance.schema';

@Injectable()
export class BalanceService {
  constructor(
    @InjectModel(Balance.name)
    private balanceModel: Model<BalanceDocument>,
  ) {}

  async findOne(balanceFilterQuery: FilterQuery<Balance>): Promise<Balance> {
    return this.balanceModel.findOne(balanceFilterQuery);
  }

  async save(_user: User, _balance: Balance): Promise<Balance> {
    const balance = new this.balanceModel({ ..._balance, user: _user });
    return balance.save();
  }

  async findOneAndUpdate(user: User, _balance: Balance): Promise<Balance> {
    return this.balanceModel
      .findOneAndUpdate({ user }, _balance)
      .setOptions({ new: true });
  }
}
