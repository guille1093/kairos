"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CategoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const filePersistor_1 = require("../app/utils/filePersistor");
const typeorm_2 = require("typeorm");
const defatul_service_1 = require("../app/defaults/defatul.service");
const users_entity_1 = require("../users/users.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const console_1 = require("console");
let CategoriesService = exports.CategoriesService = CategoriesService_1 = class CategoriesService extends defatul_service_1.DefaultService {
    constructor() {
        super(CategoriesService_1);
    }
    async getBy(params) {
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
                    deletedAt: (0, typeorm_2.IsNull)(),
                },
            });
            return category;
        }
        catch (error) {
            throw new Error(`${CategoriesService_1.name}[getBy]:${error.message}`);
        }
    }
    async all(params) {
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
                    deletedAt: (0, typeorm_2.IsNull)(),
                    name: params.query.name ? (0, typeorm_2.Like)(`%${params.query.name}%`) : undefined,
                    isActive: params.query.isActive || undefined,
                    description: params.query.description
                        ? (0, typeorm_2.Like)(`%${params.query.description}%`)
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
        }
        catch (error) {
            throw new Error(`${CategoriesService_1.name}[all]:${error.message}`);
        }
    }
    async create(file, params) {
        try {
            if (file) {
                (0, filePersistor_1.saveFile)(file);
            }
            const category = await this.categoryRepository.save({
                name: params.body.name,
                description: params.body.description || '',
                image: file?.filename || '',
                isActive: params.body.isActive === undefined ? 1 : params.body.isActive,
                createdBy: { guid: params.createdByGUID },
            });
            return category;
        }
        catch (error) {
            throw new Error(`${CategoriesService_1.name}[create]:${error.message}`);
        }
    }
    async update(file, params) {
        try {
            if (file) {
                (0, filePersistor_1.saveFile)(file);
            }
            const category = await this.categoryRepository.findOne({
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (!category) {
                throw new console_1.error('CategoryNoExists');
            }
            category.name = params.body.name || category.name;
            category.description = params.body.description || category.description;
            category.image = file?.filename || category.image;
            category.isActive =
                params.body.isActive !== undefined
                    ? params.body.isActive
                    : category.isActive;
            return await this.categoryRepository.save(category);
        }
        catch (error) {
            throw new Error(`${CategoriesService_1.name}[update]:${error.message}`);
        }
    }
    async delete(params) {
        try {
            const category = await this.categoryRepository.findOne({
                where: { guid: params.guid, deletedAt: (0, typeorm_2.IsNull)() },
            });
            if (!category) {
                throw new console_1.error('CategoryNoExists');
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
        }
        catch (error) {
            throw new Error(`${CategoriesService_1.name}[delete]:${error.message}`);
        }
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(category_entity_1.Category),
    __metadata("design:type", typeorm_2.Repository)
], CategoriesService.prototype, "categoryRepository", void 0);
__decorate([
    (0, typeorm_1.InjectRepository)(users_entity_1.User),
    __metadata("design:type", typeorm_2.Repository)
], CategoriesService.prototype, "userRepository", void 0);
exports.CategoriesService = CategoriesService = CategoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map