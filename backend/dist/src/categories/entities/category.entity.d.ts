import { User } from '../../users/users.entity';
export declare class Category {
    guid: string;
    name: string;
    description: string;
    isActive: number;
    image: string;
    createdBy?: User;
    updatedBy?: User;
    deletedBy?: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    users: User[];
    category: Category;
}
