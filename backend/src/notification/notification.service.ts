import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DefaultService } from '../app/defaults/defatul.service';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { IsNull, Like, Repository } from 'typeorm';
import { SearchNotificationDto } from './dto/search-notification.dto';
import { Notification } from './entities/notification.entity';
import { SearchNotificationPaginationDto } from './dto/search-pagination-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationNoExistsException } from './notification.exeptions';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService extends DefaultService {
  @InjectRepository(Notification)
  private readonly notificationRepository: Repository<Notification>;

  @Inject(NotificationGateway)
  private readonly notificationGateway: NotificationGateway;

  constructor() {
    super(NotificationService);
  }

  async getBy(params: { query: SearchNotificationDto }): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOne({
        select: {
          guid: true,
          title: true,
          description: true,
          link: true,
          createdAt: true,
          isActive: true,
        },
        relations: [],
        where: {
          guid: params.query.guid || undefined,
          isActive: params.query.isActive || undefined,
          deletedAt: IsNull()
        }
      });
      return notification;
    } catch (error) {
      throw new Error(`${NotificationService.name}[getBy]:${error.message}`);
    }
  }

  async all(params: { query: SearchNotificationPaginationDto }): Promise<ResposeResultsPaginationDTO> {
    try {
      const order = {};
      if (params.query.orderBy && params.query.orderType) {
        order[params.query.orderBy] = params.query.orderType;
      }

      const forPage: number = parseInt(params.query.pageSize);
      const skip: number = parseInt(params.query.offset);
      const [notification, total] = await this.notificationRepository.findAndCount({
        select: {
          guid: true,
          title: true,
          description: true,
          link: true,
          createdAt: true,
          isActive: true,
        },
        relations: [],
        where: {
          deletedAt: IsNull(),
          createdBy: {
            guid: params.query.createdBy || undefined
          },
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
        results: notification
      };
    } catch (error) {
      throw new Error(`${NotificationService.name}[all]:${error.message}`);
    }
  }

  async create(params: { body: CreateNotificationDto; createdByGUID?: string }): Promise<Notification> {
    try {

      const notification = await this.notificationRepository.save({
        title: params.body.title,
        link: params.body.link,
        description: params.body.description,
        isActive: params.body.isActive || 1,
        createdBy: { guid: params.createdByGUID }
      });

      this.notificationGateway.sendNotificationTo(notification.createdBy.guid, notification);

      return notification;
    } catch (error) {
      throw new Error(`${NotificationService.name}[create]:${error.message}`);
    }
  }

  async update(params: { guid: string; body: UpdateNotificationDto; updatedByGUID: string }): Promise<Notification> {
    try {
      const notification = await this.notificationRepository.findOne({
        where: { guid: params.guid, deletedAt: IsNull() }
      });
      if (!notification) {
        throw new NotificationNoExistsException();
      }
      notification.description = params.body.description || notification.description;
      notification.isActive = params.body.isActive !== undefined ? params.body.isActive : notification.isActive;
      return await this.notificationRepository.save(notification);
    } catch (error) {
      throw new Error(`${NotificationService.name}[update]:${error.message}`);
    }
  }
}
