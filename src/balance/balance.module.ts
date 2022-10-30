import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BalanceController } from './balance.controller';
import { Balance, BalanceSchema } from './balance.schema';
import { BalanceService } from './balance.service';

@Module({
  controllers: [BalanceController],
  providers: [BalanceService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Balance.name,
        schema: BalanceSchema,
      },
    ]),
  ],
  exports: [BalanceService],
})
export class BalanceModule {}
