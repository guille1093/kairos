import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultService } from '../app/defaults/defatul.service';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { IsNull, Like, Repository } from 'typeorm';
import { SearchPaymentMethodDto } from './dto/search-paymentMethod.dto';
import { PaymentMethod } from './entities/paymentMethod.entity';
import { SearchPaymentMethodPaginationDto } from './dto/search-pagination-paymentMethod.dto';
import { CreatePaymentMethodDto } from './dto/create-paymentMethod.dto';
import { UpdatePaymentMethodDto } from './dto/update-paymentMethod.dto';
import { PaymentMethodNoExistsException } from './paymentMethod.exeptions';

@Injectable()
export class PaymentMethodService extends DefaultService {
  @InjectRepository(PaymentMethod)
  private readonly paymentMethodRepository: Repository<PaymentMethod>;

  constructor() {
    super(PaymentMethodService);
  }

  async getBy(params: { query: SearchPaymentMethodDto }): Promise<PaymentMethod> {
    try {
      const paymentMethod = await this.paymentMethodRepository.findOne({
        select: {
          guid: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false
          }
        },
        relations: ['createdBy', 'updatedBy', 'deletedBy'],
        where: {
          guid: params.query.guid || undefined,
          name: params.query.name || undefined,
          isActive: params.query.isActive || undefined,
          deletedAt: IsNull()
        }
      });
      return paymentMethod;
    } catch (error) {
      throw new Error(`${PaymentMethodService.name}[getBy]:${error.message}`);
    }
  }

  async all(params: { query: SearchPaymentMethodPaginationDto }): Promise<ResposeResultsPaginationDTO> {
    const emptyResponse = {
      total: 0,
      pageSize: 0,
      offset: params.query.offset,
      results: []
    };
    try {
      if (Object.keys(params.query).length === 0) {
        return emptyResponse;
      }
      if (params.query.pageSize?.toString() === '0') {
        return emptyResponse;
      }

      const order = {};
      if (params.query.orderBy && params.query.orderType) {
        order[params.query.orderBy] = params.query.orderType;
      }

      const forPage: number = parseInt(params.query.pageSize);
      const skip: number = parseInt(params.query.offset);
      const [paymentMethod, total] = await this.paymentMethodRepository.findAndCount({
        select: {
          guid: true,
          name: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false
          }
        },
        relations: ['createdBy', 'updatedBy'],
        where: {
          deletedAt: IsNull(),
          name: params.query.name ? Like(`%${params.query.name}%`) : undefined,
          isActive: params.query.isActive || undefined
        },
        order,
        take: forPage,
        skip: skip
      });
      return {
        total: total,
        pageSize: forPage,
        offset: parseInt(params.query.offset),
        results: paymentMethod
      };
    } catch (error) {
      throw new Error(`${PaymentMethodService.name}[all]:${error.message}`);
    }
  }

  async create(params: { body: CreatePaymentMethodDto; createdByGUID?: string }): Promise<PaymentMethod> {
    try {
      const findPaymentMethod = await this.paymentMethodRepository.findOne({
        where: { name: params.body.name, deletedAt: IsNull() }
      });
      if (findPaymentMethod) {
        return findPaymentMethod;
      }
      const paymentMethod = await this.paymentMethodRepository.save({
        name: params.body.name,
        isActive: params.body.isActive || 1,
        createdBy: { guid: params.createdByGUID }
      });

      return paymentMethod;
    } catch (error) {
      throw new Error(`${PaymentMethodService.name}[create]:${error.message}`);
    }
  }

  async update(params: { guid: string; body: UpdatePaymentMethodDto; updatedByGUID: string }): Promise<PaymentMethod> {
    try {
      const paymentMethod = await this.paymentMethodRepository.findOne({
        where: { guid: params.guid, deletedAt: IsNull() }
      });
      if (!paymentMethod) {
        throw new PaymentMethodNoExistsException();
      }
      paymentMethod.name = params.body.name || paymentMethod.name;
      paymentMethod.isActive = params.body.isActive !== undefined ? params.body.isActive : paymentMethod.isActive;
      return await this.paymentMethodRepository.save(paymentMethod);
    } catch (error) {
      throw new Error(`${PaymentMethodService.name}[update]:${error.message}`);
    }
  }
}
