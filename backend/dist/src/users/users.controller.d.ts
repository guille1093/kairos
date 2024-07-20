/// <reference types="multer" />
import { ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from 'src/app/api.dto';
import { DefaultController } from 'src/app/defaults/default.controller';
import { CreateUserDTO, SearchUserPaginationDTO, UpdateUserDTO } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
export declare class UsersController extends DefaultController {
    private readonly userService;
    constructor();
    all(query: SearchUserPaginationDTO): Promise<ResposeSuccessPaginationDTO>;
    allProviders(query: SearchUserPaginationDTO): Promise<ResposeSuccessPaginationDTO>;
    homeProviders(query: SearchUserPaginationDTO): Promise<ResposeSuccessPaginationDTO>;
    findOneProvider(guid: string): Promise<ResposeSuccessDataDTO>;
    whoami(request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
    findOne(guid: string): Promise<ResposeSuccessDataDTO>;
    create(files: {
        profileImage?: Express.Multer.File;
        documentSideA?: Express.Multer.File;
        documentSideB?: Express.Multer.File;
        backgroundCheck?: Express.Multer.File;
        previusWorks?: Express.Multer.File[];
        certifications?: Express.Multer.File[];
    }, body: CreateUserDTO, request: {
        user: User;
    }): Promise<any>;
    singup(files: {
        profileImage?: Express.Multer.File;
        documentSideA?: Express.Multer.File;
        documentSideB?: Express.Multer.File;
        backgroundCheck?: Express.Multer.File;
        previusWorks?: Express.Multer.File[];
        certifications?: Express.Multer.File[];
    }, body: CreateUserDTO): Promise<any>;
    update(files: {
        profileImage?: Express.Multer.File;
        documentSideA?: Express.Multer.File;
        documentSideB?: Express.Multer.File;
        backgroundCheck?: Express.Multer.File;
        previusWorks?: Express.Multer.File[];
        certifications?: Express.Multer.File[];
    }, guid: string, body: UpdateUserDTO, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
    delete(guid: string, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
}
