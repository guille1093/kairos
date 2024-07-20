import { Notification } from './notification.entity';
export declare class NotificationType {
    guid: string;
    name: string;
    description: string;
    isActive: number;
    notification: Notification[];
}
