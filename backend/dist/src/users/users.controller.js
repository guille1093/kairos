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
var UsersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const api_dto_1 = require("../app/api.dto");
const default_controller_1 = require("../app/defaults/default.controller");
const role_enum_1 = require("../roles/role.enum");
const users_dto_1 = require("./users.dto");
const public_decorator_1 = require("../roles/decorators/public.decorator");
const users_service_1 = require("./users.service");
let UsersController = exports.UsersController = UsersController_1 = class UsersController extends default_controller_1.DefaultController {
    constructor() {
        super(UsersController_1);
    }
    async all(query) {
        try {
            return {
                status: 'success',
                data: await this.userService.all({ query: query })
            };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async allProviders(query) {
        query.isProfessional = 1;
        try {
            return {
                status: 'success',
                data: await this.userService.all({ query: query })
            };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async homeProviders(query) {
        query.isProfessional = 1;
        query.pageSize = 8;
        query.offset = 0;
        try {
            return {
                status: 'success',
                data: await this.userService.all({ query: query })
            };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneProvider(guid) {
        try {
            const user = await this.userService.getBy({ query: { guid: guid, isProfessional: 1 } });
            return { status: 'success', data: user };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async whoami(request) {
        try {
            const user = await this.userService.getBy({
                query: { guid: request.user.guid }
            });
            return { status: 'success', data: user };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(guid) {
        try {
            const user = await this.userService.getBy({ query: { guid: guid } });
            return { status: 'success', data: user };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(files, body, request) {
        try {
            const user = await this.userService.create(files, {
                body: body,
                createdByGUID: request.user.guid
            });
            return { status: 'success', data: user };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async singup(files, body) {
        try {
            const user = await this.userService.create(files, {
                body: body
            });
            return { status: 'success', data: user };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(files, guid, body, request) {
        try {
            const updatedUser = await this.userService.update(files, {
                guid: guid,
                body: body,
                updatedByGUID: request.user.guid
            });
            return { status: 'success', data: updatedUser };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(guid, request) {
        try {
            const service = await this.userService.delete({
                guid: guid,
                updatedByGUID: request.user.guid
            });
            return { status: 'success', data: service };
        }
        catch (error) {
            this.logger.error(error.message ?? error);
            throw new common_1.HttpException({
                status: 'error',
                message: `${UsersController_1.name}-${error.message ?? error}`
            }, error.status ?? common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.Inject)(users_service_1.UsersService),
    __metadata("design:type", users_service_1.UsersService)
], UsersController.prototype, "userService", void 0);
__decorate([
    (0, common_1.Get)(),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessPaginationDTO, status: common_1.HttpStatus.OK }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessPaginationDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SearchUserPaginationDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "all", null);
__decorate([
    (0, common_1.Get)('providers'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get all providers' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessPaginationDTO, status: common_1.HttpStatus.OK }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessPaginationDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SearchUserPaginationDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "allProviders", null);
__decorate([
    (0, common_1.Get)('homeProviders'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get homepage providers' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessPaginationDTO, status: common_1.HttpStatus.OK }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessPaginationDTO }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SearchUserPaginationDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "homeProviders", null);
__decorate([
    (0, common_1.Get)('providers/:guid'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get one provider by guid' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOneProvider", null);
__decorate([
    (0, common_1.Get)('whoami'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get Who am I' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "whoami", null);
__decorate([
    (0, common_1.Get)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get one user by guid' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create User' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.CONFLICT }),
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profileImage', maxCount: 1 },
        { name: 'documentSideA', maxCount: 1 },
        { name: 'documentSideB', maxCount: 1 },
        { name: 'backgroundCheck', maxCount: 1 },
        { name: 'previusWorks', maxCount: 10 },
        { name: 'certifications', maxCount: 10 }
    ], {
        dest: './uploads/temp'
    })),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.CreateUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('signup'),
    (0, public_decorator_1.Public)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'SignUp' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.CREATED }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.CONFLICT }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profileImage', maxCount: 1 },
        { name: 'documentSideA', maxCount: 1 },
        { name: 'documentSideB', maxCount: 1 },
        { name: 'backgroundCheck', maxCount: 1 },
        { name: 'previusWorks', maxCount: 10 },
        { name: 'certifications', maxCount: 10 }
    ], {
        dest: './uploads/temp'
    })),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "singup", null);
__decorate([
    (0, common_1.Patch)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super, role_enum_1.RoleEnum.ServiceProvier, role_enum_1.RoleEnum.Client, role_enum_1.RoleEnum.Moderator),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update User' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profileImage', maxCount: 1 },
        { name: 'documentSideA', maxCount: 1 },
        { name: 'documentSideB', maxCount: 1 },
        { name: 'backgroundCheck', maxCount: 1 },
        { name: 'previusWorks', maxCount: 10 },
        { name: 'certifications', maxCount: 10 }
    ], {
        dest: './uploads/temp'
    })),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Param)('guid')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, users_dto_1.UpdateUserDTO, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':guid'),
    (0, default_controller_1.Auth)(role_enum_1.RoleEnum.Super),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete User' }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeSuccessDataDTO, status: common_1.HttpStatus.OK }),
    (0, swagger_1.ApiResponse)({ type: api_dto_1.ResposeDTO, status: common_1.HttpStatus.NOT_FOUND }),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("../app/api.dto").ResposeSuccessDataDTO }),
    __param(0, (0, common_1.Param)('guid')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = UsersController_1 = __decorate([
    (0, common_1.Controller)('users'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [])
], UsersController);
//# sourceMappingURL=users.controller.js.map