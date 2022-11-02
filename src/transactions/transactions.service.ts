import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { BalanceService } from 'src/balance/balance.service';
import { User } from '../users/users.schema';
import { Transaction, TransactionDocument } from './transactions.schema';

const COMMISSION = {
  USDC: '00.5',
  TRY: '1',
};

const RATE = {
  USDC: '55.46542',
  TRY: '1',
};

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
    private readonly balanceService: BalanceService,
  ) {}

  async findAll(filterQuery: FilterQuery<User>): Promise<Transaction[]> {
    return this.transactionModel.find(filterQuery);
  }

  async save(_user: User, _transaction: Transaction): Promise<Transaction> {
    const transaction = new this.transactionModel({
      ..._transaction,
      commission: COMMISSION[_transaction.currency],
      rate: RATE[_transaction.currency],
      beneficiary_amount: `${
        parseFloat(_transaction.sender_amount) *
        parseFloat(RATE[_transaction.currency])
      }`,
      status: 'created',
      user: _user,
    });
    return transaction.save();
  }

  async approve(user: User, id: string): Promise<Transaction> {
    const _balance = await this.balanceService.findOne({ user });
    const _transaction = await this.transactionModel.findOne({ _id: id });
    _balance.amount = `${
      parseFloat(_balance.amount) - parseFloat(_transaction.sender_amount)
    }`;
    await this.balanceService.findOneAndUpdate(user, _balance);
    return this.transactionModel
      .findOneAndUpdate(
        { _id: id },
        { completion_date: Date(), status: 'sent' },
      )
      .setOptions({ new: true });
  }

  async cancel(user: User, id: string): Promise<Transaction> {
    return this.transactionModel
      .findOneAndUpdate(
        { user, _id: id },
        { completion_date: Date(), status: 'canceled' },
      )
      .setOptions({ new: true });
  }
}
