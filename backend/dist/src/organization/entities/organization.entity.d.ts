import { User } from '../../users/users.entity';
export declare class Organization {
    guid: string;
    name: string;
    description: string;
    isActive: number;
    createdBy?: User;
    updatedBy?: User;
    deletedBy?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    users: User[];
}
