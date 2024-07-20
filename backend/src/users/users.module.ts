import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/roles.entity';
import { User } from 'src/users/users.entity';
import { Category } from 'src/categories/entities/category.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PaymentMethod } from 'src/paymentMethod/entities/paymentMethod.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User, Role, Category, PaymentMethod])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule { }
