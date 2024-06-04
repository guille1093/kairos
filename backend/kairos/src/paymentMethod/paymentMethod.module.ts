import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodService } from './paymentMethod.service';
import { PaymentMethodController } from './paymentMethod.controller';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { User } from '../users/users.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, PaymentMethod])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService]
})
export class PaymentMethodModule { }
