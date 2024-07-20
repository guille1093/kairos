import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { saveFile } from 'src/app/utils/filePersistor';
import { IsNull, Like, Repository } from 'typeorm';
import { ResposeResultsPaginationDTO } from '../app/api.dto';
import { DefaultService } from '../app/defaults/defatul.service';
import { User } from '../users/users.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { SearchCategoryDto } from './dto/search-category.dto';
import { SearchCategoryPaginationDto } from './dto/search-pagination-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { error } from 'console';
@Injectable()
export class CategoriesService extends DefaultService {
  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  constructor() {
    super(CategoriesService);
  }

  async getBy(params: { query: SearchCategoryDto }): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        select: {
          guid: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          image: true,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false,
          },
        },
        relations: ['createdBy', 'updatedBy', 'deletedBy'],
        where: {
          guid: params.query.guid || undefined,
          name: params.query.name || undefined,
          isActive: params.query.isActive || undefined,
          description: params.query.description || undefined,
          deletedAt: IsNull(),
        },
      });
      return category;
    } catch (error) {
      throw new Error(`${CategoriesService.name}[getBy]:${error.message}`);
    }
  }

  async all(params: {
    query: SearchCategoryPaginationDto;
  }): Promise<ResposeResultsPaginationDTO> {
    const emptyResponse = {
      total: 0,
      pageSize: 0,
      offset: params.query.offset,
      results: [],
    };
    try {
      if (Object.keys(params.query).length === 0) {
        return emptyResponse;
      }

      if (params.query.pageSize?.toString() === '0') {
        return emptyResponse;
      }

      const order = {};
      if (params.query.orderBy && params.query.orderType) {
        order[params.query.orderBy] = params.query.orderType;
      }

      const [categories, total] = await this.categoryRepository.findAndCount({
        select: {
          guid: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          isActive: true,
          createdBy: {
            guid: true,
            name: true,
            lastname: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: false,
          },
        },
        relations: ['createdBy', 'updatedBy'],
        where: {
          deletedAt: IsNull(),
          name: params.query.name ? Like(`%${params.query.name}%`) : undefined,
          isActive: params.query.isActive || undefined,
          description: params.query.description
            ? Like(`%${params.query.description}%`)
            : undefined,
        },
        order,
        take: params.query.pageSize,
        skip: params.query.offset,
      });

      return {
        total,
        pageSize: params.query.pageSize * 1,
        offset: params.query.offset * 1,
        results: categories,
      };
    } catch (error) {
      throw new Error(`${CategoriesService.name}[all]:${error.message}`);
    }
  }

  async create(
    file: Express.Multer.File,
    params: {
      body: CreateCategoryDto;
      createdByGUID?: string;
    },
  ): Promise<Category> {
    try {
      if (file) {
        saveFile(file);
      }
      const category = await this.categoryRepository.save({
        name: params.body.name,
        description: params.body.description || '',
        image: file?.filename || '',
        isActive: params.body.isActive === undefined ? 1 : params.body.isActive,
        createdBy: { guid: params.createdByGUID },
      });

      return category;
    } catch (error) {
      throw new Error(`${CategoriesService.name}[create]:${error.message}`);
    }
  }

  async update(
    file: Express.Multer.File,
    params: {
      guid: string;
      body: UpdateCategoryDto;
      updatedByGUID: string;
    },
  ): Promise<Category> {
    try {
      if (file) {
        saveFile(file);
      }
      const category = await this.categoryRepository.findOne({
        where: { guid: params.guid, deletedAt: IsNull() },
      });
      if (!category) {
        throw new error('CategoryNoExists');
      }
      category.name = params.body.name || category.name;
      category.description = params.body.description || category.description;
      category.image = file?.filename || category.image;

      category.isActive =
        params.body.isActive !== undefined
          ? params.body.isActive
          : category.isActive;

      // category.updatedBy = { guid: params.updatedByGUID };
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new Error(`${CategoriesService.name}[update]:${error.message}`);
    }
  }

  async delete(params: {
    guid: string;
    deletedByGUID: string;
  }): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { guid: params.guid, deletedAt: IsNull() },
      });
      if (!category) {
        throw new error('CategoryNoExists');
      }

      const user = await this.userRepository.findOne({
        where: { guid: params.deletedByGUID },
      });
      if (!user) {
        throw new Error('UserNoExists');
      }

      category.deletedAt = new Date();
      category.deletedBy = user;
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new Error(`${CategoriesService.name}[delete]:${error.message}`);
    }
  }
}
