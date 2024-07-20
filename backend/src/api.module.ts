import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ApiController } from './app/api.controller';
import { ApiService } from './app/api.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { PaymentMethodModule } from 'src/paymentMethod/paymentMethod.module';
import { NotificationModule } from 'src/notification/notification.module';
import { OrganizationModule } from './organization/organization.module';


@Module({
  imports: [UsersModule, AuthModule, CategoriesModule, PaymentMethodModule, NotificationModule, OrganizationModule],
  providers: [ApiService],
  controllers: [ApiController],
  exports: []
})
export class ApiModule { }
