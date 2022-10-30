import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { User } from 'src/users/users.schema';
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
        parseFloat(_transaction.sender_amount) * RATE[_transaction.currency]
      }`,
      status: 'created',
      user: _user,
    });
    return transaction.save();
  }

  async approve(user: User, id: string): Promise<Transaction> {
    return this.transactionModel
      .findOneAndUpdate(
        { user, _id: id },
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
