/// <reference types="multer" />
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { DefaultService } from '../app/defaults/defatul.service';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { SearchCategoryPaginationDto } from './dto/search-pagination-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService extends DefaultService {
    private readonly categoryRepository;
    private readonly userRepository;
    constructor();
    getBy(params: {
        query: SearchCategoryDto;
    }): Promise<Category>;
    all(params: {
        query: SearchCategoryPaginationDto;
    }): Promise<ResposeResultsPaginationDTO>;
    create(file: Express.Multer.File, params: {
        body: CreateCategoryDto;
        createdByGUID?: string;
    }): Promise<Category>;
    update(file: Express.Multer.File, params: {
        guid: string;
        body: UpdateCategoryDto;
        updatedByGUID: string;
    }): Promise<Category>;
    delete(params: {
        guid: string;
        deletedByGUID: string;
    }): Promise<Category>;
}
