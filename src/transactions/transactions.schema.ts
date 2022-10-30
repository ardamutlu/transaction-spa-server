import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Type } from 'class-transformer';
import { User } from 'src/users/users.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;

  @Prop()
  sender_name: string;

  @Prop()
  beneficiary_name: string;

  @Prop()
  currency: string;

  @Prop()
  sender_amount: string;

  @Prop()
  beneficiary_amount: string;

  @Prop()
  commission: string;

  @Prop()
  rate: string;

  @Prop({ type: Date, default: Date() })
  creation_date: Date;

  @Prop({ type: Date })
  completion_date?: Date;

  @Prop()
  beneficiary_type: string;

  @Prop()
  sender_type: string;

  @Prop()
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
