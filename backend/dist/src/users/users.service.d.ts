/// <reference types="multer" />
import { ResposeResultsPaginationDTO } from 'src/app/api.dto';
import { DefaultService } from 'src/app/defaults/defatul.service';
import { CreateUserDTO, SearchUserDTO, SearchUserPaginationDTO, UpdateUserDTO } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
export declare class UsersService extends DefaultService {
    private readonly userRepository;
    private readonly userRoleRepository;
    private readonly categoryRepository;
    private readonly paymentMethodRepository;
    constructor();
    private _hashPassword;
    getBy(params: {
        query: SearchUserDTO;
        withPassword?: boolean;
    }): Promise<User>;
    all(params: {
        query: SearchUserPaginationDTO;
    }): Promise<ResposeResultsPaginationDTO>;
    create(files: {
        profileImage?: Express.Multer.File;
        documentSideA?: Express.Multer.File;
        documentSideB?: Express.Multer.File;
        backgroundCheck?: Express.Multer.File;
        previusWorks?: Express.Multer.File[];
        certifications?: Express.Multer.File[];
    }, params: {
        body: CreateUserDTO;
        createdByGUID?: string;
    }): Promise<User>;
    update(files: {
        profileImage?: Express.Multer.File;
        documentSideA?: Express.Multer.File;
        documentSideB?: Express.Multer.File;
        backgroundCheck?: Express.Multer.File;
        previusWorks?: Express.Multer.File[];
        certifications?: Express.Multer.File[];
    }, params: {
        guid: string;
        body: UpdateUserDTO;
        updatedByGUID: string;
    }): Promise<User>;
    delete(params: {
        guid: string;
        updatedByGUID: string;
    }): Promise<User>;
}
