import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(_user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(_user.password, 10);
    const user = new this.userModel({
      ..._user,
      password: hashedPassword,
    });
    return user.save();
  }

  async findOne(
    userFilterQuery: FilterQuery<Pick<User, 'username'>>,
  ): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }
}
