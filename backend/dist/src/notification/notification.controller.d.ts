import { DefaultController } from '../app/defaults/default.controller';
import { ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { User } from '../users/users.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationController extends DefaultController {
    private readonly NotificationService;
    constructor();
    all(query: any, request: {
        user: User;
    }): Promise<ResposeSuccessPaginationDTO>;
    findOne(guid: string): Promise<ResposeSuccessDataDTO>;
    create(body: CreateNotificationDto, request: {
        user: User;
    }): Promise<any>;
    update(guid: string, body: UpdateNotificationDto, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
}
