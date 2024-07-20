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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var CategoriesController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const api_dto_1 = require("../app/api.dto");
const default_controller_1 = require("../app/defaults/default.controller");
const role_enum_1 = require("../roles/role.enum");
const create_category_dto_1 = require("../categories/dto/create-category.dto");
const update_category_dto_1 = require("../categories/dto/update-category.dto");
const categories_service_1 = require("./categories.service");
let CategoriesController = exports.CategoriesController = CategoriesController_1 = class CategoriesController extends default_controller_1.DefaultController {
    constructor() {
        super(CategoriesController_1);
    }
    async all(query) {
        try {
            return {
                status: 'success',
                data: await this.categoryService.all({ query: query }),
            };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${CategoriesController_1.name}-${error.message ?? error}`,
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(guid) {
        try {
            const category = await this.categoryService.getBy({
                query: { guid: guid },
            });
            return { status: 'success', data: category };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${CategoriesController_1.name}-${error.message ?? error}`,
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(file, body, request) {
        try {
            const category = await this.categoryService.create(file, {
                body: body,
                createdByGUID: request.user.guid,
            });
            return { status: 'success', data: category };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${CategoriesController_1.name}-${error.message ?? error}`,
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(file, guid, body, request) {
        try {
            const updatedCategory = await this.categoryService.update(file, {
                guid: guid,
                body: body,
                updatedByGUID: request.user.guid,
            });
            return { status: 'success', data: updatedCategory };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${CategoriesController_1.name}-${error.message ?? error}`,
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(guid, body, request) {
        try {
            const category = await this.categoryService.delete({
                guid: guid,
                deletedByGUID: request.user.guid,
            });
            return { status: 'success', data: category };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${CategoriesController_1.name}-${error.message ?? error}`,
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Inject)(categories_service_1.CategoriesService),
    __metadata("design:type", categories_service_1.CategoriesService)
], CategoriesController.prototype, "categoryService", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all categories' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessPaginationDTO, status: common_1.HttpStatus.OK }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessPaginationDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "all", null);
__decorate([
    (0, common_1.Get)(':guid'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get one category by guid' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.Moderator),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        dest: './uploads/temp',
    })),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Category' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.CONFLICT }),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({
                maxSize: 20000000,
            }),
        ],
        fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update Category' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        dest: './uploads/temp',
    })),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({
                maxSize: 20000000,
            }),
        ],
        fileIsRequired: false,
    }))),
    __param(1, (0, common_1.Param)('guid')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete Category' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "delete", null);
exports.CategoriesController = CategoriesController = CategoriesController_1 = __decorate([
    (0, common_1.Controller)('categories'),
    (0, swagger_1.ApiTags)('Categories'),
    __metadata("design:paramtypes", [])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map