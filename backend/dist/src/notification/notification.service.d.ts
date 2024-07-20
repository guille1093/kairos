import { DefaultService } from '../app/defaults/defatul.service';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { SearchNotificationDto } from './dto/search-notification.dto';
import { Notification } from './entities/notification.entity';
import { SearchNotificationPaginationDto } from './dto/search-pagination-notification.dto';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationService extends DefaultService {
    private readonly notificationRepository;
    private readonly notificationGateway;
    constructor();
    getBy(params: {
        query: SearchNotificationDto;
    }): Promise<Notification>;
    all(params: {
        query: SearchNotificationPaginationDto;
    }): Promise<ResposeResultsPaginationDTO>;
    create(params: {
        body: CreateNotificationDto;
        createdByGUID?: string;
    }): Promise<Notification>;
    update(params: {
        guid: string;
        body: UpdateNotificationDto;
        updatedByGUID: string;
    }): Promise<Notification>;
}
