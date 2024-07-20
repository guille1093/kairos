import { User } from '../../users/users.entity';
import { NotificationType } from './notificationType.entity';
export declare class Notification {
    guid: string;
    title: string;
    description: string;
    link: string;
    isActive: number;
    createdBy?: User;
    updatedBy?: User;
    deletedBy?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    notificationType: NotificationType;
}
