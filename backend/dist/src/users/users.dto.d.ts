import { RoleEnum } from 'src/roles/role.enum';
export declare class LoginDTO {
    username: string;
    password: string;
}
export declare class googleOAuthDTO {
    googleID: string;
    email: string;
    name: string;
    lastname: string;
}
export declare class CreateUserDTO {
    username: string;
    document: string;
    phone: string;
    birthdate: Date;
    profileImage: string;
    documentSideA: string;
    documentSideB: string;
    backgroundCheck: string;
    backgroundCheckDate: Date;
    backgroundCheckExpirationDate: Date;
    mapAdress: string;
    address: string;
    email?: string;
    googleID?: string;
    name: string;
    lastname?: string;
    isActive?: number;
    isProfessional?: number;
    password: string;
    roleGuid: RoleEnum | string;
    category?: string;
    availability?: {};
    description?: string;
    isAvailable?: number;
    paymentMethods?: string;
}
declare const UpdateUserDTO_base: import("@nestjs/common").Type<Partial<CreateUserDTO>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
}
export declare class SearchUserDTO {
    guid?: string;
    username?: string;
    document?: string;
    isProfessional?: number;
    isActive?: number;
    password?: string;
    googleID?: string;
    email?: string;
    category?: string;
}
export declare class SearchUserPaginationDTO {
    guid?: string;
    name?: string;
    paymentMethod?: string;
    phone?: string;
    lastname?: string;
    isProfessional?: number;
    email?: string;
    mapAdress?: string;
    username?: string;
    document?: string;
    isActive?: number;
    roleGuid: RoleEnum | string;
    createdByGuid?: string;
    updatedByGuid?: string;
    offset?: any;
    pageSize?: any;
    orderBy?: 'name' | 'lastname' | 'username';
    orderType?: 'ASC' | 'DESC';
    category?: string;
    categoryID?: string;
}
export {};
