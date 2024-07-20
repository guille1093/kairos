import { User } from '../users/users.entity';
export declare class Role {
    guid: string;
    role: string;
    description?: string;
    users: User[];
}
