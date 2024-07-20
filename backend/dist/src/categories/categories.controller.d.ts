/// <reference types="multer" />
import { ResposeSuccessDataDTO, ResposeSuccessPaginationDTO } from '../app/api.dto';
import { DefaultController } from '../app/defaults/default.controller';
import { User } from '../users/users.entity';
import { CreateCategoryDto } from '../categories/dto/create-category.dto';
import { UpdateCategoryDto } from '../categories/dto/update-category.dto';
export declare class CategoriesController extends DefaultController {
    private readonly categoryService;
    constructor();
    all(query: any): Promise<ResposeSuccessPaginationDTO>;
    findOne(guid: string): Promise<ResposeSuccessDataDTO>;
    create(file: Express.Multer.File, body: CreateCategoryDto, request: {
        user: User;
    }): Promise<any>;
    update(file: Express.Multer.File, guid: string, body: UpdateCategoryDto, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
    delete(guid: string, body: UpdateCategoryDto, request: {
        user: User;
    }): Promise<ResposeSuccessDataDTO>;
}
