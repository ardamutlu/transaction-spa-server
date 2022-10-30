import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorizedModule } from './modules/authorized/authorized.module';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { BalanceModule } from './balance/balance.module';

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:oi2r9b2wOfnXYqwf@transaction-spa.k9frouv.mongodb.net/?retryWrites=true&w=majority',
    ),
    AuthorizedModule,
    UnauthorizedModule,
    AuthModule,
    UsersModule,
    TransactionsModule,
    BalanceModule,
  ],
})
export class AppModule {}
