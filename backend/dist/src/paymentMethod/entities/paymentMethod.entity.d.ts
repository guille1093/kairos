import { User } from '../../users/users.entity';
export declare class PaymentMethod {
    guid: string;
    name: string;
    isActive: number;
    createdBy?: User;
    updatedBy?: User;
    deletedBy?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    users: User[];
}
