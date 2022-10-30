import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from '../users/users.schema';

export type BalanceDocument = Balance & Document;

@Schema()
export class Balance {
  @Prop()
  amount: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
